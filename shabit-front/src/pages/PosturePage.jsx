import React, { useState } from 'react';
import Modal from '../components/Posture/Modal';

export default function PosturePage() {
  const [videoURL, setVideoURL] = useState(); // 재생할 비디오 URL

  return (
    <div>
      <Modal videoURL={videoURL} setVideoURL={setVideoURL} />
      <iframe title="stretch video" src={videoURL} width="460" height="300" />
    </div>
  );
}
