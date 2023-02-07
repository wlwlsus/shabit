import React, { useEffect, useState } from 'react';
import { fetchAlarmTime } from '../../services/admin/get';
import VideoSettings from './videos/VideoSettings';

const AdminVideoContainer = () => {
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
      <VideoSettings />
    </div>
  );
};

export default AdminVideoContainer;
