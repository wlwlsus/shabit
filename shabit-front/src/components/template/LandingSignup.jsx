import React from 'react';
import styled from 'styled-components';

import LandingContainer from '../molecules/LandingContainer';
import Sidebar from '../organisms/LandingSidebar';
import LandingContent from '../organisms/LandingContent';
import SignupForm from '../organisms/SignupForm';

const LandingSignup = () => {
  return (
    <Wrapper>
      <LandingContainer
        children1={<Sidebar />}
        children2={<LandingContent />}
        children3={<SignupForm />}
      ></LandingContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default LandingSignup;
