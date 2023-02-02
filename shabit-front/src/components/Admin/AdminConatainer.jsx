import React, { useEffect, useState } from 'react';
import { fetchAlarmTime } from '../../services/admin/get';
import AlarmSettings from './contents/AlarmSettings';
import QuotesSettings from './contents/QuotesSettings';
import VideoSettings from './contents/VideoSettings';

const AdminConatainer = () => {
  /* 
    건강 랜덤 구문 조회

    영상 카테고리 리스트 조회
    영상 리스트 조회
    영상 삭제
    영상 등록

    알람 시간 수정
    알람 시간 조회

    건강 문구 등록
    건강 문구 리스트 조회
    건강 문구 삭제
  */
  useEffect(() => {
    Promise.allSettled([fetchAlarmTime]);
  });

  return (
    <div>
      <AlarmSettings />
      <QuotesSettings />
      <VideoSettings />
    </div>
  );
};

export default AdminConatainer;
