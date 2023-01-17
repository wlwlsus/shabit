import React from 'react';
import styled from 'styled-components';

import LandingIntro from '../components/template/LandingIntro';

const LandingPage = () => {
  return (
    <PageWrapper>
      <LandingIntro />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LandingPage;
