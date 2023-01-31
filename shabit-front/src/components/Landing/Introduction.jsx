import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

import Logo from '../common/Logo';

import { TbArrowBigRightLine } from 'react-icons/tb';

import { loadEffect } from '../common/animation';

const Introduction = () => {
  return (
    <ContentWrapper>
      <WelcomeWrapper>
        <span>Welcome to</span>
        <Logo size={'lg'} />
      </WelcomeWrapper>
      <ImgWrapper>
        <Img src={'/assets/posture-bad.png'} alt="" />
        <TbArrowBigRightLine />
        <Img src={'/assets/posture-good.png'} alt="" />
      </ImgWrapper>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  animation: 0.8s ease-in ${loadEffect.down};
`;

const WelcomeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 2rem;
  font-weight: bold;
  color: ${theme.color.whiteColor};
`;

const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    color: ${theme.color.whiteColor};
    font-size: 3rem;
  }
`;

const Img = styled.img`
  width: 9rem;
  margin: 0 1rem;
`;
export default Introduction;
