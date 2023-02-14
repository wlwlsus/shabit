import React, { useEffect, useState, useCallback } from 'react';
import * as tmPose from '@teachablemachine/pose';

const Pose = (start) => {
  const [setting, setSetting] = useState();
  const [id, setId] = useState();
  const [timerId, setTimerId] = useState();
  let model, webcam, poseCnt;
  let maxPose;
  let prevPose;
  let time = 0;

  let alarmSec = 9;
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
        }
        if (maxPose === '바른 자세') {
          time = 0;
        }
      }
    }
  };
  
  const tracking = useCallback(async () => {
    webcam.update();
    await predictPose();
  }, [webcam]);

  const onStart = useCallback(async () => {
    await webcam.play();
    // id = setInterval(tracking, 16); //TODO reqeustAnimationFrame이랑 비슷한 효과를 내려면 16ms여야됨
    setTimerId(
      setInterval(() => {
        time += 1;
        if (time >= alarmSec) {
          notify(maxPose, 'pose');
          time = 0;
        }
      }, 1000),
    ); // 초 세는 거 -> 지속시간 확인
    setId(setInterval(tracking, 100));
  }, [webcam]);

  const onPause = useCallback(
    (id, timerId) => {
      clearInterval(id);
      clearInterval(timerId);
      webcam.pause();
    },
    [webcam],
  );
  const notify=(pose,kind)=>{
    var text,notification;
    var img = "./public/assets/logo-pink.png";

    if(kind==='pose'){
      text = `혹시 자세가 흐트러지셨나요? 올바른 자세는 척추 건강에 도움이 됩니다. :)`;
    }
    if(Notification.permission==='granted'){
      notification = new Notification(`현재 자세 :${pose}`,{body:text, icon:img});
    }
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            notification = new Notification(`현재 자세 :${pose}`,{body:text, icon:img});
        }
      });
    }
}   


  useEffect(() => {
    if (start===false) onPause(id, timerId);
    if(start && setting) onStart();
  }, [start]);

  useEffect(() => {
    init();
  }, []);


};
export default Pose;
