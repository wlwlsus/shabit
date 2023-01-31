import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

import Logo from '../common/Logo';

import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk, SiNaver } from 'react-icons/si';

import { loadEffect } from '../common/animation';

const LandingContent = () => {
  return (
    <Container>
      <WelcomeWrapper>
        <span>Welcome to</span>
        <Logo size={'lg'} />
      </WelcomeWrapper>

      <SocialWrapper>
        <div>다른 계정으로 로그인하기</div>
        <IconWrapper>
          <FcGoogle />
          <SiKakaotalk />
          <SiNaver />
        </IconWrapper>
      </SocialWrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

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

const SocialWrapper = styled.div`
  margin-left: 1rem;
  font-size: 0.8rem;
  color: ${theme.color.whiteColor};
`;

const IconWrapper = styled.div`
  width: 30%;
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-evenly;
  font-size: 1.5rem;

  transition: all 0.2s linear;

  & > svg {
    cursor: pointer;
    transition: all 0.2s linear;

    &:hover {
      transform: scale(1.1);
    }
  }

  & > svg:nth-child(2) {
    background-color: ${theme.color.blackColor};
    color: ${theme.color.yellowColor};
    border-radius: 0.2rem;
  }

  & > svg:nth-child(3) {
    background-color: ${theme.color.whiteColor};
    color: ${theme.color.greenColor};
    border-radius: 0.2rem;
  }
`;
export default LandingContent;
