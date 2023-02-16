import { useEffect, useState, useCallback } from 'react';
import * as tmPose from '@teachablemachine/pose';
import { setPose, setPoseId } from '../../store/poseSlice';
import { useDispatch, useSelector } from 'react-redux';
import notify from '../../utils/notify';
import {
  setLogArray,
  setCapture,
  setTrackingSetting,
} from '../../store/trackingSlice';
import { dateFormat } from '../../utils/dateFormat';
import { getSeconds } from '../../utils/dateFormat';
import poseIdConvert from '../../utils/poseIdConvert';

const TrackingPose = () => {
  const dispatch = useDispatch();
  //트래킹을 위한 webcam setting의 완료 여부
  const [id, setId] = useState();
  const [timerId, setTimerId] = useState();
  const [webCamSetting,setWebcamSetting] = useState(false);
  let log = {};
  let model, webcam, poseCnt;
  let maxPose;
  let prevPose;
  let time = 0;
  let captureTime = 0;
  let startTime, endTime, movingStartTime, resume;
  let movingLog = {};
  let movingArray = [0, 0, 0, 0, 0];
  let movingArraySnapshot = [0, 0, 0, 0, 0];

  // 특정 자세 유지 시간
  const DURATION_TIME = 60;

  let alarmSec = useSelector((state) => {
    return state.admin.alertTime;
  });
  const mode = useSelector((state) => {
    return state.mode.mode;
  });
  const trackingSetting = useSelector((state) => {
    return state.tracking.trackingSetting;
  });

  const init = async () => {
    //TODO : 개선) 이 model을 load하는 부분만 맨 밖으로 빼도 괜찮을 것 같음
    model = await tmPose.load(
      '/my_model/model.json',
      '/my_model/metadata.json',
    );
    poseCnt = model.getTotalClasses();
    const size = 300;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    onStart();
    dispatch(setTrackingSetting(true));
    setWebcamSetting(true);
  };

  const predictPose = async (isStop = false) => {
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    const prediction = await model.predict(posenetOutput);
    let res;

    for (let i = 0; i < poseCnt; i++) {
      res = prediction[i].probability.toFixed(2);
      // 최초 시작 포즈를 설정함
      if (!prevPose) prevPose = prediction[i].className;
      if (!movingStartTime) movingStartTime = new Date();

      // 움직이는 상태 배열에 현재 포즈의 자세를 1 올림
      if (res > 0.7) {
        movingArray[i] += 1;
        maxPose = prediction[i].className;
        if (isStop || prevPose !== maxPose) {
          endTime = new Date();
          //자세가 30초 유지됐을 때 로그 저장
          const timeLimit = 30;
          if (
            isStop ||
            getSeconds(endTime) - getSeconds(startTime) > timeLimit
          ) {
            //움직이는 상태가 30초 이상 지속됐으면 snapshot에서 가장 큰 값을 로그 남김
            if (
              getSeconds(startTime) - getSeconds(movingStartTime) >
              timeLimit
            ) {
              movingLog = {
                startTime: dateFormat(movingStartTime),
                endTime: dateFormat(startTime),
                postureId: poseIdConvert(
                  movingArraySnapshot.indexOf(Math.max(...movingArraySnapshot)),
                ),
              };
              dispatch(setLogArray(movingLog));
              // console.log(movingLog);
              // console.log(movingArraySnapshot);
              // console.log(prediction[movingLog.postureId]);
            } else if (resume) {
              resume = false;
            } else {
              //움직이는 상태가 30초 미만이면 로그 안남기고 그냥 통합시킴
              startTime = movingStartTime;
            }
            log = {
              startTime: dateFormat(startTime),
              endTime: dateFormat(endTime),
              postureId: poseIdConvert(
                prediction.findIndex((e) => e.className === prevPose),
              ),
            };
            dispatch(setLogArray(log));
            // console.log(log);
            // console.log(prediction[log.postureId]);

            //로그를 남긴 후, 움직이는 상태 배열을 초기화
            movingStartTime = endTime;
            movingArray = [0, 0, 0, 0, 0];
          }
          movingArraySnapshot = [...movingArray]; //포즈가 바뀔 때, 지금까지의 움직이는 상태를 얕은 복사
          prevPose = maxPose;
          startTime = endTime;
          dispatch(setPose(prediction[i].className));
          dispatch(setPoseId(i)); //다를 경우만 포즈설정
          captureTime = 0;
        }
        //바른 자세
        if (maxPose === '바른 자세') time = 0;
      }
    }
  };
  const tracking = useCallback(async () => {
    webcam.update();
    await predictPose();
  }, [webcam]);

  const onStop = useCallback(
    (id, timerId) => {
      predictPose(true).finally(() => {
        webcam.stop();
        setPose('');
        clearInterval(id);
        clearInterval(timerId);
        dispatch(setTrackingSetting(false));
        movingStartTime = 0;
        movingArray = [0, 0, 0, 0, 0];
        movingArraySnapshot = [0, 0, 0, 0, 0];
      });
    },
    [webcam],
  );

  const onPause = useCallback(
    (id, timerId) => {
      predictPose(true).finally(() => {
        clearInterval(id);
        clearInterval(timerId);
        webcam.pause();
        movingStartTime = 0;
        movingArray = [0, 0, 0, 0, 0];
        movingArraySnapshot = [0, 0, 0, 0, 0];
        resume = true;
      });
    },
    [webcam],
  );

  const onStart = useCallback(async () => {
    await webcam.play();
    // id = setInterval(tracking, 16); //TODO reqeustAnimationFrame이랑 비슷한 효과를 내려면 16ms여야됨
    startTime = new Date();
    setTimerId(
      setInterval(() => {
        time += 1;
        captureTime += 1;
        if (time >= alarmSec) {
          notify(maxPose, 'pose');
          time = 0;
        }
        if (captureTime === DURATION_TIME) {
          captureTime = 0;
          dispatch(setCapture(true));
        }
      }, 1000),
    ); // 초 세는 거 -> 지속시간 확인
    setId(setInterval(tracking, 100));
  }, [webcam, setTimerId, setId]);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (trackingSetting && mode &&webCamSetting === 'startLive') onStart();
    else if (mode === 'stopLive') onStop(id, timerId);
    else if (mode === 'pausedLive') onPause();
    else if (mode === 'stretching') onStop(id, timerId);
  }, [mode]);
};
export default TrackingPose;
