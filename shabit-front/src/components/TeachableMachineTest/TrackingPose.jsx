import React, {  useEffect, useState } from 'react';
import * as tmPose from '@teachablemachine/pose';
import Loading from '../common/Loading';
import {setPose} from "../../store/poseSlice";
import {useDispatch,useSelector} from 'react-redux';
import notify from '../../utils/notify';

const TrackingPose = () =>{
    // 바른 자세인지 아닌지
    const [load,setLoad] = useState(false);
    const dispatch = useDispatch();
    const isRunning = useSelector((state) => {
        return state.time.isRunning;
    });
    let model,webcam, poseCnt;
    let id;
    let maxPose; 
    let prevPose;
    let time;
    let alarmSec;
    let isSetTime = true;

    const init = async()=>{
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
        alarmSec = sessionStorage.getItem('alertTime')*3; //일단 9초
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
                maxPose = prediction[i].className;
                //자세 바뀜
                if(prevPose!==maxPose) {
                    prevPose = maxPose;
                    dispatch(setPose(prediction[i].className)); //다를 경우만 포즈설정
                }
            }
        }
        //바른 자세
        if(maxPose === '바른 자세'){
            isSetTime=true;
        }
        //바르지 않은 자세
        else{
            // 바른 -> 바르지않은이 되었을 때 시간 기억
            if(isSetTime) time = Date.now();
            // 바르지않은 -> 바르지않은 시간 얼마나 지났는지 계산
            else getElapsedTime();
            isSetTime = false;
        }
    }
    const onStop = async () =>{
        console.log("tracking멈ㅊㅁ");
        await clearInterval(id);
        // TODO: data날려주기
    }
    useEffect(()=>{
        onStop();
    },[isRunning]);

    const getElapsedTime = ()=>{
        const now = Date.now(); //
        const elapsed =Math.floor((now-time) / 1000);
        if(elapsed>=alarmSec){
            notify(maxPose,'pose');
            time =now;
        }
    }
    useEffect(() => {
        init();
    }, []);
    
    const tracking = async() =>{
        webcam.update();
        await predictPose();
    }
   
    return(
        <div>
            {load && <Loading />}
            <button onClick={onStop}>스탑</button>
        </div>
    )

}
export default TrackingPose;