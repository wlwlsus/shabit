import React, { useState } from 'react';
import { header } from '../../../services';
import { fetchAlarmTime } from '../../../services/admin/get';
import { putAlarmTime } from '../../../services/admin/put';
import store, { typedUseSelector } from '../../../store';
import { setAlertTime, setStretchingTime } from '../../../store/adminSlice';
import apiRequest from '../../../utils/apiRequest';

export default function AlarmSettings() {
  /*
    알람 시간 수정
    알람 시간 조회
  */
  const { stretchingTime, alertTime } = typedUseSelector(
    (state) => state.admin.alertTime,
  );
  const [stretchingTimeInput, setStretchingTimeInput] = useState('');
  const [alertTimeInput, setAlertTimeInput] = useState('');
  const onchange = (e) => {
    const { name, value } = e.target;
    if (name === 'stretchingTimeInput') setStretchingTimeInput(value);
    else if (name === 'alertTimeInput') setAlertTimeInput(value);
  };

  const onClick = async (e) => {
    putAlarmTime(
      stretchingTimeInput ? stretchingTimeInput : stretchingTime,
      alertTimeInput ? alertTimeInput : alertTime,
    )
      .then(() => {
        setStretchingTimeInput('');
        setAlertTimeInput('');
      })
      .catch();
  };

  return (
    <>
      <div>스트레칭 시간 : {stretchingTime} 분 간격</div>
      <input
        type="text"
        name="stretchingTimeInput"
        value="stretchingTimeInput"
        placeholder="스트레칭 시간 변경"
        onchange={onchange}
      />
      <div>자세 경고 시간 : {alertTime} 분 간격</div>
      <input
        type="text"
        name="alertTimeInput"
        value="alertTimeInput"
        placeholder="자세 경고 시간 변경"
        onchange={onchange}
      />
      <button type="button" onClick={onClick}>
        수정하기
      </button>
    </>
  );
}
