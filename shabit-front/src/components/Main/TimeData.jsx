import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { loadEffect } from '../common/animation';

import ThemeBox from './ThemeBox';
import Logo from '../common/Logo';

import PostureTimeData from './PostureTimeData';

export default function TimeData({ total, time }) {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>자세 유지 시간</Title>
      </TitleWrapper>
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
`;

const TitleWrapper = styled.div`
  display: flex;
  position: absolute;
  align-self: start;
  align-items: center;
  top: 14.5rem;
  animation: 0.8s ease-in ${loadEffect.down};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  align-self: start;
  margin-left: 3rem;
  background-color: ${(props) => props.theme.color.secondary};
  color: ${(props) => props.theme.color.primary};
  font-weight: bold;
  padding: 0.3rem;
  border-radius: 0.5rem;
  border: 0.1rem solid ${(props) => props.theme.color.primary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
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
  animation: 0.8s ease-in ${loadEffect.down};

  & > div {
    width: 47%;
  }
`;


const P = styled.div`
  color: ${(props) => props.theme.color.primary};
  font-weight: bold;
  position: relative;
`;

const Data = styled.div``;
