import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export default function StretchContent() {
  const videoURL = useSelector((state) => {
    let url = state.video.videoURL + `?autoplay=1&mute=1`;
    return url;
  });

  return (
    <VideoWrapper>
      <Video title="stretch video" src={videoURL} />
    </VideoWrapper>
  );
}

const Video = styled.iframe`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
`;

const VideoWrapper = styled.div`
  position: absolute;
  width: 45%;
  height: 50%;
  left: 3%;
  top: 30%;
`;
