import React, { useEffect } from 'react';
import MyCapture from "../TeachableMachineTest/MyCapture";
import MyPose from "../TeachableMachineTest/MyPose";
import {setInitTime,calUsedTime,calStretchTime} from '../../store/timeSlice';
import { useDispatch } from 'react-redux';
import { typedUseSelector } from '../../store';

export default function LiveContent() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const nickname = user.nickname;
  const isRunning = typedUseSelector((state) => {
    return state.time.isRunning;
  });
  const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(setInitTime(50));
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
      <MyCapture nickname={nickname} />
      <MyPose/>
    </div>
    );
}
