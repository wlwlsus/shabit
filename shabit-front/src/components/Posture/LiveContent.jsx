import React, { useEffect } from 'react';
import MyCapture from "../TeachableMachineTest/MyCapture";
import {setInitTime,calUsedTime,calStretchTime} from '../../store/timeSlice';
import { useDispatch } from 'react-redux';
import { typedUseSelector } from '../../store';
import TrackingPose from '../TeachableMachineTest/TrackingPose';
import { getAlarmTime } from '../../services/admin/get';

export default function LiveContent() {
  const isRunning = typedUseSelector((state) => {
    return state.time.isRunning;
  });
  const dispatch = useDispatch();
    useEffect(()=>{
      getAlarmTime().then((stretchingTime)=>
        dispatch(setInitTime(stretchingTime)));
    },[]);
    
    useEffect(()=>{
      let usedTimeId,stretchTimeId;
      if(isRunning){
        usedTimeId = setInterval(()=>{
            dispatch(calUsedTime());
        },1000);
      
      // TODO: 1분으로 바꿔야 함
        stretchTimeId = setInterval(()=>{
          dispatch(calStretchTime());
      },1000);
      }
        return ()=>{
          clearInterval(usedTimeId);
          clearInterval(stretchTimeId);
        }

    },[isRunning])


  return (
    <div>
      <MyCapture/>
      {/* <TrackingPose/> */}
    </div>
    );
}
