// 알람 보내기
const notify = (pose, kind) => {
  var text, notification;
  var img = './public/assets/logo-pink.png';
  if (kind === 'pose') {
    text = `혹시 자세가 흐트러지셨나요? 올바른 자세는 척추 건강에 도움이 됩니다. :)`;
  } else if (kind === 'stretching') {
    text = `스트레칭으로 리프레쉬 해보세요. 시작하시겠습니까?`;
  }
  if (!("Notification" in window)) {
      alert("데스크톱 알림을 지원하지 않는 브라우저입니다.");
  }
  else if (Notification.permission === "granted") {
    notification = new Notification(`현재 자세 :${pose}`, {
      body: text,
      icon: img,
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        notification = new Notification(`현재 자세 :${pose}`, {
          body: text,
          icon: img,
        });
      }
    });
  }else{
    console.log(Notification)
  }
      // 3초뒤 알람 닫기

  if(notification!==undefined){
    notification.onclick = () => {
    window.focus();
    // this.close();
    };
  }
};
export default notify;
