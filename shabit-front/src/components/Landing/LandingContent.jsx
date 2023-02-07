import React from 'react';
import styled from 'styled-components';
import { loadEffect } from '../common/animation';

import Logo from '../common/Logo';
import SocialLogin from './SocialLogin';

const LandingContent = () => {
  return (
    <Container>
      <WelcomeWrapper>
        <span>Welcome to</span>
        <Logo size={'lg'} />
      </WelcomeWrapper>
      <SocialWrapper>
        <SocialLogin />
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
  justify-content: space-evenly;
  font-size: 2.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.color.whiteColor};
`;

const SocialWrapper = styled.div`
  margin-left: 3rem;
  font-size: 0.8rem;
  color: ${(props) => props.theme.color.whiteColor};
`;

export default LandingContent;
