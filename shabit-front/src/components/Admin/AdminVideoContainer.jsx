import React, { useEffect } from 'react';
import { fetchAlarmTime } from '../../services/admin/get';
import VideoSettings from './videos/VideoSettings';

const AdminVideoContainer = () => {
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
