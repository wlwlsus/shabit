import React, { useEffect, useState } from 'react';
import * as tmPose from '@teachablemachine/pose';
import { setPose,setPoseId } from '../../store/poseSlice';
import { useDispatch, useSelector } from 'react-redux';
import notify from '../../utils/notify';
import { setLogArray,setInitLogArray } from '../../store/trackingSlice';

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
      console.log("TIME",time);
      if(time>=alarmSec){
        notify(maxPose,'pose');
        time=0;
      }
    },1000));// 초 세는 거
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
          //보내기
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
    // TODO: data날려주기
  };
  useEffect(() => {
    console.log("ID",id)
    if(isRunning===false) onStop(id);
  }, [isRunning]);

  
  // const getElapsedTime = () => {
  //   const now = Date.now(); //
  //   const elapsed = Math.floor((now - time));
  //   console.log(alarmSec,'초->',elapsed,'초');
  //   if (elapsed >= alarmSec) {
  //     notify(maxPose, 'pose');
  //     time = now;
  //   }
  // };
  useEffect(() => {
    init();
  }, []);

  const tracking = async () => {
    webcam.update();
    await predictPose();
  };
  const dateFormat=(date)=> {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}
};
export default TrackingPose;
