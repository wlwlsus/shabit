import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { loadEffect } from '../common/animation';

import { SlShare } from 'react-icons/sl';
import {RiScreenshot2Fill} from 'react-icons/ri';
import ThemeBox from './ThemeBox';
import Logo from '../common/Logo';

import PostureTimeData from './PostureTimeData';

export default function TimeData({ today }) {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>자세 유지 시간</Title>
      </TitleWrapper>
      <ButtonWrapper>
        <DownloadButton>
          <RiScreenshot2Fill />
        </DownloadButton>
        <ShareButton>
          <SlShare />
        </ShareButton>
      </ButtonWrapper>
      <ContentWrapper>
          <Data>
            <P>바른 자세</P>
            <PostureTimeData total={89} data={69} />
          </Data>
          <Data>
            <P>바른 자세</P>
            <PostureTimeData total={89} data={69} />
          </Data>
          <Data>
            <P>바른 자세</P>
            <PostureTimeData total={89} data={69} />
          </Data>
          <Data>
            <P>바른 자세</P>
            <PostureTimeData total={89} data={69} />
          </Data>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const TitleWrapper = styled.div`
  display: flex;
  position: absolute;
  align-self: start;
  align-items: center;
  top: 13rem;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

const Button = styled.div`
  padding: 0.3rem;
  font-size: 1.75rem;

  transition: all 0.2s linear;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const DownloadButton = styled(Button)`
  color: ${(props) => props.theme.color.primary};
`;

const ShareButton = styled(Button)`
  color: ${(props) => props.theme.color.primary};
  margin: 0 1rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
  border-radius: 1.5rem;
  border: 0.2rem solid ${(props) => props.theme.color.secondary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.grayColor};
  animation: 0.8s ease-in ${loadEffect.down};

  & > div {
    width: 47%;
  }
`;

const DataWrapper = styled.div`
  padding: 2rem;
  animation: 0.8s ease-in ${loadEffect.down};
`;

const P = styled.div`
  color: ${(props) => props.theme.color.blackColor};
  font-size: 0.75rem;
  font-weight: bold;
  margin-top: 1rem;
  position: relative;
`;

const Goal = styled.span`
  color: ${(props) => props.theme.color.darkGrayColor};
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0.3rem;
  position: relative;
`;

const Today = styled.span`
  color: ${(props) => props.theme.color.primary};
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0.3rem;
  position: relative;
`;

const Data = styled.div`
`;