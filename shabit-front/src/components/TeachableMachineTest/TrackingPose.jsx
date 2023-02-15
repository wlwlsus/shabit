import { useEffect, useState, useCallback } from 'react';
import * as tmPose from '@teachablemachine/pose';
import { setPose, setPoseId } from '../../store/poseSlice';
import { useDispatch, useSelector } from 'react-redux';
import notify from '../../utils/notify';
import { setLogArray, setCapture,setTrackingSetting } from '../../store/trackingSlice';
import {dateFormat} from '../../utils/dateFormat';
import {getSeconds} from '../../utils/dateFormat';


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
  let startTime, endTime;
  // 특정 자세 유지 시간
  const DURATION_TIME = 60;
  
  let alarmSec = useSelector((state) => {
    return state.admin.alertTime;
  });
  const mode = useSelector((state)=>{
    return state.mode.mode;
  })
  const trackingSetting = useSelector((state)=>{
    return state.tracking.trackingSetting;
  })

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
      if (res > 0.7) {
        maxPose = prediction[i].className;
        //자세 바뀜 -> data저장해서 보내줘야됨
        if (prevPose !== maxPose) {
          prevPose = maxPose;
          endTime = new Date();
          if(getSeconds(endTime)-getSeconds(startTime)>60){
             //로그 저장
              log = { startTime:dateFormat(startTime), endTime:dateFormat(endTime), postureId: i };
              dispatch(setLogArray(log));
          }
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
    console.log(id);
  }, [webcam,setTimerId,setId]);


  useEffect(() => {
    init();
  }, []);

  useEffect(()=>{
    if(trackingSetting&&mode==='startLive') onStart();
    else if(mode === 'stopLive') onStop(id,timerId);
    else if(mode === 'pausedLive') onPause();
    else if(mode==='stretching') onStop(id,timerId);
  },[mode])

};
export default TrackingPose;
