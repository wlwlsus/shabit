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

const TrackingPose = () => {
  const dispatch = useDispatch();
  //트래킹을 위한 webcam setting의 완료 여부
  const [id, setId] = useState();
  const [timerId, setTimerId] = useState();
  let log = {};
  let model, webcam, poseCnt;
  let maxPose;
  let prevPose;
  let time = 0;
  let captureTime = 0;
  let startTime, endTime, movingStartTime;
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
  };

  const predictPose = async () => {
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    const prediction = await model.predict(posenetOutput);
    let res;

    for (let i = 0; i < poseCnt; i++) {
      res = prediction[i].probability.toFixed(2);
      // 최초 시작 포즈를 설정함
      if (!prevPose) prevPose = prediction[i].className;
      if (!movingStartTime) movingStartTime = startTime;
      // 움직이는 상태 배열에 현재 포즈의 자세를 1 올림
      if (res > 0.7) {
        movingArray[i] += 1;
        maxPose = prediction[i].className;
        if (prevPose !== maxPose) {
          endTime = new Date();
          //자세가 30초 유지됐을 때 로그 저장
          const timeLimit = 30;
          if (getSeconds(endTime) - getSeconds(startTime) > timeLimit) {
            //움직이는 상태가 30초 이상 지속됐으면 snapshot에서 가장 큰 값을 로그 남김
            if (
              getSeconds(startTime) - getSeconds(movingStartTime) >
              timeLimit
            ) {
              movingLog = {
                startTime: dateFormat(movingStartTime),
                endTime: dateFormat(startTime),
                postureId: movingArraySnapshot.indexOf(
                  Math.max(...movingArraySnapshot),
                ),
              };
              dispatch(setLogArray(movingLog));
              // console.log(movingArraySnapshot);
              // console.log(prediction[movingLog.postureId]);
              // console.log(movingLog);
            } else {
              //움직이는 상태가 30초 미만이면 로그 안남기고 그냥 통합시킴
              startTime = movingStartTime;
            }
            log = {
              startTime: dateFormat(startTime),
              endTime: dateFormat(endTime),
              postureId: prediction.findIndex((e) => e.className === prevPose),
            };
            dispatch(setLogArray(log));
            // console.log(prediction[log.postureId]);
            // console.log(log);

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
      webcam.stop();

      // ##### 맨 마지막에 movingLog에 남아있는 데이터들을 서버로 던지고
      // array를 초기화하고 종료합니다.
      movingLog = {
        startTime: dateFormat(movingStartTime),
        endTime: dateFormat(startTime),
        postureId: movingArray.indexOf(Math.max(...movingArray)),
      };
      dispatch(setLogArray(movingLog));
      /*
      참고 : 
      movingLog : Log가 찍히기 전까지의 모든 데이터입니다.
      movingLogSnapshot : '현재 자세'가 되기 전의 모든 데이터입니다.

      ex) 
      0~30초 -> 움직임
      30초~45초 -> 왼팔굄

      위와 같은 상황일 때
      movingLog : 0~45초의 데이터
      movingLogSnapshot: 0~30초의 데이터
      */

      movingLog = [0, 0, 0, 0, 0];
      clearInterval(id);
      clearInterval(timerId);
      dispatch(setTrackingSetting(false));
    },
    [webcam],
  );

  const onPause = useCallback(
    (id, timerId) => {
      clearInterval(id);
      clearInterval(timerId);
      webcam.pause();
    },
    [webcam],
  );

  const onStart = useCallback(async () => {
    await webcam.play();
    // id = setInterval(tracking, 16); //TODO reqeustAnimationFrame이랑 비슷한 효과를 내려면 16ms여야됨
    startTime = new Date();
    console.log(startTime);
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
    console.log(id);
  }, [webcam, setTimerId, setId]);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (trackingSetting && mode === 'startLive') onStart();
    else if (mode === 'stopLive') onStop(id, timerId);
    else if (mode === 'pausedLive') onPause();
    else if (mode === 'stretching') onStop(id, timerId);
  }, [mode]);
};
export default TrackingPose;
