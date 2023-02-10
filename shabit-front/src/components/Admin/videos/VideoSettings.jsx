import React, { useState } from 'react';
import styled from 'styled-components';
import { loadEffect } from '../../../styles/animation';
import VideoFilter from './VideoFilter';
import VideoInput from './VideoInput';
import VideoList from './VideoList';

export default function VideoSettings() {
  const [scrollProp, setScrollProp] = useState({
    page: 0,
    category: 0,
    length: 0,
  });

  return (
    <VodWrapper>
      <>
        <PostWrapper>
          <VideoInput scrollProp={scrollProp} setScrollProp={setScrollProp} />
        </PostWrapper>
      </>
      <>
        <ButtonContainer>
          <VideoFilter setScrollProp={setScrollProp} scrollProp={scrollProp} />
        </ButtonContainer>
        <VideoList scrollProp={scrollProp} setScrollProp={setScrollProp} />
      </>
    </VodWrapper>
  );
}

const PostWrapper = styled.div`
  margin-top: 2.5rem;
  position: relative;
  border: black;
  height: 4.5rem;
`;

const VodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  animation: 0.8s ease-in ${loadEffect.up};
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
`;
