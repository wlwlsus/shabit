import React from 'react';
import MyCapture from "../TeachableMachineTest/MyCapture";
import MyPose from "../TeachableMachineTest/MyPose";
// 여기에 코드 임포트 해주쎄여

export default function LiveContent() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const nickname = user.nickname;

  return (
    <div>
      <MyCapture nickname={nickname} />
      <MyPose/>
    </div>
    );
}
