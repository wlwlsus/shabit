import React from 'react';
import styled from 'styled-components';
import { loadEffect } from '../../styles/animation';

import PostureTimeData from './PostureTimeData';

export default function TimeData({ total, time }) {
  return (
    <Wrapper>
      <Title>자세 유지 시간</Title>
      <ContentWrapper>
        <Data>
          <P>바른 자세</P>
          <PostureTimeData total={total} time={time[0]} />
        </Data>
        <Data>
          <P>거북목 자세</P>
          <PostureTimeData total={total} time={time[1]} />
        </Data>
        <Data>
          <P>비스듬한 자세</P>
          <PostureTimeData total={total} time={time[2]} />
        </Data>
        <Data>
          <P>누운 자세</P>
          <PostureTimeData total={total} time={time[3]} />
        </Data>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 2rem;
  position: relative;
  font-weight: bold;
  color: ${(props) => props.theme.color.primary};
  animation: 0.8s ease-in ${loadEffect.down};
`;

const Title = styled.div`
  background-color: ${(props) => props.theme.color.secondary};
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
  position: absolute;
  top: -5%;
  left: 5%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  padding: 2.25rem 1rem 0.5rem 1rem;
  border-radius: 1.5rem;
  border: 0.2rem solid ${(props) => props.theme.color.secondary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.grayColor};

  & > div {
    width: 47%;
  }
`;

const P = styled.div``;

const Data = styled.div``;
