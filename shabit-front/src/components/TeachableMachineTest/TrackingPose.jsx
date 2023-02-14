import React, { useEffect, useState, useCallback } from 'react';
import * as tmPose from '@teachablemachine/pose';
import { setPose, setPoseId } from '../../store/poseSlice';
import { useDispatch, useSelector } from 'react-redux';
import notify from '../../utils/notify';
import { setLogArray, setCapture } from '../../store/trackingSlice';
import dateFormat from '../../utils/dateFormat';
import { setMode } from '../../store/modeSlice';

const TrackingPose = () => {
  const dispatch = useDispatch();
  //트래킹을 위한 webcam setting의 완료 여부
  const [setting, setSetting] = useState();
  const [id, setId] = useState();
  const [timerId, setTimerId] = useState();
  let log = {};
  let model, webcam, poseCnt;
  let maxPose;
  let prevPose;
  let time = 0;
  let captureTime = 0;
  let startTime, endTime;
  // 특정 자세 유지 시간
  const DURATION_TIME = 60;
  
  let alarmSec = useSelector((state) => {
    return state.admin.alertTime;
  });
  const mode = useSelector((state)=>{
    return state.mode.mode;
  })

  // let alarmSec = 9;
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
    setSetting(true);
  };

  const predictPose = async () => {
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    const prediction = await model.predict(posenetOutput);
    let res;

    for (let i = 0; i < poseCnt; i++) {
      res = prediction[i].probability.toFixed(2);
      if (res > 0.7) {
        maxPose = prediction[i].className;
        //자세 바뀜 -> data저장해서 보내줘야됨
        if (prevPose !== maxPose) {
          prevPose = maxPose;
          endTime = dateFormat(new Date());
          //로그 저장
          log = { startTime, endTime, postureId: i };
          dispatch(setLogArray(log));
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
      clearInterval(id);
      clearInterval(timerId);
      webcam.stop();
      setSetting(false);
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
    startTime = dateFormat(new Date());
    setTimerId(
      setInterval(() => {
        time += 1;
        captureTime+=1;
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
  }, [webcam]);

  // TODO mode가 stopLive로 바뀔 때
  // useEffect(() => {
  //   if (isStop) {
  //     onStop(id, timerId);
  //   }
  // }, [isStop]);

  useEffect(() => {
    init();
    dispatch(setMode("startLive"));
  }, []);
  useEffect(()=>{
    console.log(mode);
    if(setting && mode==='startLive') onStart();
    else if(mode === 'stopLive') onStop();
    else if(mode === 'pausedLive') onPause();
    else if(mode==='stretching') onStop();
  },[mode])
  // TODO : startLive mode일 때 , pauseMode일 때
  // useEffect(() => {
  //   console.log(isRunning);
  //   if (isRunning === false) onPause(id, timerId);
  //   if (isRunning && setting) onStart();
  // }, [isRunning, setting]);


};
export default TrackingPose;
