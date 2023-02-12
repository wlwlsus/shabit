import React, { useEffect, useState } from 'react';
import * as tmPose from '@teachablemachine/pose';
import { setPose } from '../../store/poseSlice';
import { useDispatch, useSelector } from 'react-redux';
import notify from '../../utils/notify';
import { setLogArray,setInitLogArray } from '../../store/trackingSlice';
import { postData } from '../../services/stat/post';

const TrackingPose = () => {
  // 바른 자세인지 아닌지
  const dispatch = useDispatch();
  const isRunning = useSelector((state) => {
    return state.time.isRunning;
  });
  const [id,setId] = useState();
  let log={};
  let model, webcam, poseCnt;
  // let id;
  let maxPose;
  let prevPose;
  let time;
  let isSetTime = true;
  let startTime, endTime;
  const logArray = useSelector((state)=>{
    return state.tracking.logArray;
  });
  // let alarmSec = useSelector((state)=>{
  //   return state.time.alertTime;
  // }) ;
  let alarmSec = 9*1000; //일단 9초
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
          log = {startTime,endTime,maxPose};
          dispatch(setLogArray(log));
          startTime = endTime;
          dispatch(setPose(prediction[i].className)); //다를 경우만 포즈설정
        }
      }
    }
    //바른 자세
    if (maxPose === '바른 자세') {
      isSetTime = true;
    }
    //바르지 않은 자세
    else {
      // 바른 -> 바르지않은이 되었을 때 시간 기억
      if (isSetTime) time = Date.now();
      // 바르지않은 -> 바르지않은 시간 얼마나 지났는지 계산
      else getElapsedTime();
      isSetTime = false;
    }
  };
  const onStop = async (id) => {
    await clearInterval(id);
    // TODO: data날려주기
    postData(logArray).then(()=>{
      setInitLogArray();
    });
  };
  useEffect(() => {
    console.log("ID",id)
    if(isRunning===false) onStop(id);
  }, [isRunning]);

  const getElapsedTime = () => {
    const now = Date.now(); //
    const elapsed = Math.floor((now - time));
    console.log(alarmSec,'초->',elapsed,'초');
    if (elapsed >= alarmSec) {
      notify(maxPose, 'pose');
      time = now;
    }
  };
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
  // return (
  //   // <div>
  //   //   <button onClick={onStop}>{alarmSec}</button>
  //   // </div>
  // );
};
export default TrackingPose;
