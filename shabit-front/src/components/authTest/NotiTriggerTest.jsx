import React from 'react';
import useNotification from '../../hooks/useNotification';

const NotiTriggerTest = () => {
  const notiTrigger = useNotification('타이틀', {
    body: 'notification body test',
  });

  return <button onClick={notiTrigger}>알림창 테스트</button>;
};

export default NotiTriggerTest;
