import React, { useEffect, useRef, useState } from 'react';
import * as tmPose from '@teachablemachine/pose';
import Loading from '../common/Loading';

const TrackingPose = () =>{
    const [pose,setPose] = useState();
    const [time,setTime] = useState();
    const [load,setLoad] = useState(false);
    const [alarmSec,setAlarmSec] = useState();
    let model,webcam, poseCnt;
    let id;

    const init = async()=>{
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
        setAlarmSec(sessionStorage.getItem('alertTime')*3);
        setLoad(true);
        id = setInterval(tracking,16);
    }
    const predictPose = async()=>{
        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
        const prediction = await model.predict(posenetOutput);
        let res;
        for (let i = 0; i < poseCnt; i++) {
            res =  prediction[i].probability.toFixed(2);
            if(res>0.7){
                setPose(prediction[i].className);
                setTime(Date.now());
            }
        }
    }
    const onStop = async () =>{
        await clearInterval(id);
        console.log(id);
    }
    useEffect(() => {
        init();
    }, []);

    useEffect(()=>{
        //시간 이상함
        const now = Date.now();
        const elapsed = now - time;
        const elapsedSec = elapsed/1000;
        console.log(elapsedSec,alarmSec)
        if(elapsedSec>=alarmSec) {
            notify(pose);
            setTime(now);
        }
    },[pose]);

    const tracking = async() =>{
        webcam.update();
        await predictPose();
    }
    // 알람 보내기
    const notify=(pose)=>{
        if(Notification.permission==='granted'){
          const text = `혹시 자세가 흐트러지셨나요? 올바른 자세는 척추 건강에 도움이 됩니다. :)
          `;
          const img = "./public/assets/logo-pink.png";
          new Notification(`현재 자세 :${pose}`,{body:text, icon:img});
        }
        else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              const text = `${pose}자세 3분 유지 중입니다.`;
          const img = "./public/assets/logo-pink.png";
          new Notification("똑바로 앉으세요",{body:text, icon:img});
            }
          });
        }
    }
    return(
        <div>
            {!load ? <Loading /> : ``}
            <button onClick={onStop}>스탑</button>
        </div>
    )

}
export default TrackingPose;