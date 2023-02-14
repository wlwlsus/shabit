import React, { useEffect } from 'react';
import MyCapture2 from '../TeachableMachineTest/MyCapture2';
import { calUsedTime, calStretchTime } from '../../store/timeSlice';
import TrackingPose from '../TeachableMachineTest/TrackingPose';
import { useDispatch,useSelector } from 'react-redux';
import Capture from '../TeachableMachineTest/Capture';
import MyCapture from '../TeachableMachineTest/MyCapture';

export default function LiveContent() {

  const dispatch = useDispatch();
  const mode = useSelector((state)=>{
    return state.mode.mode;
  })


  // ---밑에 코드 ) TODO Mode 바뀔 때로 바꿔야됨 ---
  useEffect(() => {
    let usedTimeId, stretchTimeId;
    if (mode==='startLive') {
      usedTimeId = setInterval(() => {
        dispatch(calUsedTime());
      }, 60000);

      stretchTimeId = setInterval(() => {
        dispatch(calStretchTime());
      }, 1000);
    }
    return () => {
      clearInterval(usedTimeId);
      clearInterval(stretchTimeId);
    };
  }, [mode]);

  return (
    <div>
      <MyCapture />
      {/* <MyCapture2 /> */}
      {/* <Capture/> */}
      <TrackingPose />
    </div>
  );
}
