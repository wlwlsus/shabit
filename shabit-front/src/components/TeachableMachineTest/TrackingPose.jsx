import React, { useEffect, useState } from 'react';
import * as tmPose from '@teachablemachine/pose';
import { setPose,setPoseId } from '../../store/poseSlice';
import { useDispatch, useSelector } from 'react-redux';
import notify from '../../utils/notify';
import { setLogArray } from '../../store/trackingSlice';
import dateFormat from '../../utils/dateFormat';

const TrackingPose = () => {
  // 바른 자세인지 아닌지
  const dispatch = useDispatch();
  const isRunning = useSelector((state) => {
    return state.time.isRunning;
  });
  const [id,setId] = useState();
  const [timerId,setTimerId] = useState();
  let log={};
  let model, webcam, poseCnt;
  let maxPose;
  let prevPose;
  let time=0;
  let startTime, endTime;

  // let alarmSec = useSelector((state)=>{
  //   return state.time.alertTime;
  // }) ;
  let alarmSec = 9; //일단 9초
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
    await webcam.play();
    // id = setInterval(tracking, 16); //TODO reqeustAnimationFrame이랑 비슷한 효과를 내려면 16ms여야됨
    startTime = dateFormat(new Date());
    setTimerId(setInterval(()=>{
      time+=1;
      if(time>=alarmSec){
        notify(maxPose,'pose');
        time=0;
      }
    },1000));// 초 세는 거 -> 지속시간 확인
    setId(setInterval(tracking, 100));
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
          console.log(endTime);
          //로그 저장
          log = {startTime,endTime,postureId:i};
          dispatch(setLogArray(log));
          startTime = endTime;
          dispatch(setPose(prediction[i].className));
          dispatch(setPoseId(i)); //다를 경우만 포즈설정
        }
      }
    }
    // //바른 자세
    if (maxPose === '바른 자세') {
      time=0;
    }
  };
  const onStop = async (id) => {
    await clearInterval(id);
    await clearInterval(timerId);
  };

  useEffect(() => {
    console.log("ID",id)
    if(isRunning===false) onStop(id);
  }, [isRunning]);
  
  useEffect(() => {
    init();
  }, []);

  const tracking = async () => {
    webcam.update();
    await predictPose();
  };
};
export default TrackingPose;
