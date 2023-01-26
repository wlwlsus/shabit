import React from 'react';
import { useSelector } from 'react-redux';

export default function StretchContent() {
  const videoURL = useSelector((state) => {
    return state.video.videoURL;
  });

  if (videoURL) {
    return (
      <div>
        <iframe title="stretch video" src={videoURL} width="460" height="300" />
      </div>
    );
  }
}
