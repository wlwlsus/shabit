import React, { useEffect } from 'react';
import MyCapture from '../TeachableMachineTest/MyCapture';
import { calUsedTime, calStretchTime } from '../../store/timeSlice';
import { typedUseSelector } from '../../store';
import TrackingPose from '../TeachableMachineTest/TrackingPose';
import { useDispatch } from 'react-redux';

export default function LiveContent() {
  const isRunning = typedUseSelector((state) => {
    return state.time.isRunning;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    let usedTimeId, stretchTimeId;
    if (isRunning) {
      usedTimeId = setInterval(() => {
        dispatch(calUsedTime());
      }, 1000);

      // TODO: 1분으로 바꿔야 함
      stretchTimeId = setInterval(() => {
        dispatch(calStretchTime());
      }, 1000);
    }
    return () => {
      clearInterval(usedTimeId);
      clearInterval(stretchTimeId);
    };
  }, [isRunning]);

  return (
    <div>
      <MyCapture />
      <TrackingPose />
    </div>
  );
}
