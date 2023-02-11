 // 알람 보내기
 const notify=(pose,kind)=>{
    var text,notification;
    var img = "./public/assets/logo-pink.png";

    if(kind==='pose'){
      text = `혹시 자세가 흐트러지셨나요? 올바른 자세는 척추 건강에 도움이 됩니다. :)`;
    }
    else if(kind ==='stretching'){
      text = `N시간 중 N분동안 00자세를 하셨습니다. 혹시 000가 불편하신가요?? 지금 00 스트레칭을 시작하시겠습니까?`;

    }  
    if(Notification.permission==='granted'){
      notification = new Notification(`현재 자세 :${pose}`,{body:text, icon:img});
    }
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            notification = new Notification(`현재 자세 :${pose}`,{body:text, icon:img});
        }
      });
    }
    notification.onclick = () => {
        window.focus();
        this.cancel();
    }
}    
export default notify;