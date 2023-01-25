import React from 'react';
import styled from 'styled-components';

import Logo from '../common/Logo';

import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk, SiNaver } from 'react-icons/si';

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

const Container = styled.div``;

const WelcomeWrapper = styled.div``;

const SocialWrapper = styled.div``;

const IconWrapper = styled.div`
  width: 50%;
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-evenly;
`;
export default LandingContent;
