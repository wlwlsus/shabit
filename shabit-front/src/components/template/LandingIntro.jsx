import React from 'react';
import styled from 'styled-components';

import LandingContainer from '../molecules/LandingContainer';
import Sidebar from '../organisms/LandingSidebar';
import LandingIntroContent from '../organisms/LandingIntroContent';
import LandingIntroStart from '../organisms/LandingIntroStart';

const LandingIntro = () => {
  return (
    <Wrapper>
      <LandingContainer
        children1={<Sidebar />}
        children2={<LandingIntroContent />}
        children3={<LandingIntroStart />}
      ></LandingContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default LandingIntro;
