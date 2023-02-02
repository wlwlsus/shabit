import React from 'react';
import { header } from '../../../services';
import store, { typedUseSelector } from '../../../store';
import { setAlertTime, setStretchingTime } from '../../../store/adminSlice';
import apiRequest from '../../../utils/apiRequest';

export default function AlarmSettings() {
  /*
    알람 시간 수정
    알람 시간 조회
  */
  const stretchingTime = typedUseSelector(
    (state) => state.admin.stretchingTime,
  );
  const alertTime = typedUseSelector((state) => state.admin.alertTime);
  // const [stretchingInput, stretchingInput] =

  return <div>AlarmSettings</div>;
}
