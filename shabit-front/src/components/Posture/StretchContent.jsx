import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { theme } from '../../styles/GlobalStyles';
import { AiFillNotification } from 'react-icons/ai';
import styled from 'styled-components';

export default function StretchContent() {
  const videoURL = useSelector((state) => {
    let url = state.video.videoURL + `?autoplay=1&mute=1`;
    return url;
  });

  return (
    <>
      <InfoBox>
        <AiFillNotification />
        영상을 보고 따라해보세요.
      </InfoBox>
      <iframe title="stretch video" src={videoURL} width="460" height="300" />
    </>
  );
}

const InfoBox = styled.div`
  width: 75%;
  height: 8%;
  background-color: ${theme.color.secondary};
  border: 0.1rem solid ${theme.color.primary};
  border-radius: 1rem;
  font-weight: bold;
  padding: 1rem;
  display: flex;
  align-items: center;

  & > svg {
    color: ${theme.color.primary};
    margin-right: 1rem;
  }
`;
