import { useRef } from 'react';

const useNotification = (title, options) => {
  const timerRef = useRef(false);

  if (!('Notification' in window)) {
    return;
  }

  const fireNotif = () => {
    // 마지막 알림을 보낸지 1분 이내면 밖으로 나갑니다
    if (timerRef.current) return;
    timerRef.current = setTimeout(() => {
      clearTimeout(timerRef.current);
      timerRef.current = false;
    }, 60000);
    /* 권한 요청 부분 */
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          /* 권한을 요청받고 nofi를 생성해주는 부분 */
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      /* 권한이 있을때 바로 noti 생성해주는 부분 */
      new Notification(title, options);
    }
  };
  return fireNotif;
};

export default useNotification;
