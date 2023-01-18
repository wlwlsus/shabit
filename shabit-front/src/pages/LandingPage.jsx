import React from 'react';
import styled from 'styled-components';

// import LandingIntro from '../components/template/LandingIntro';
// import LandingLogin from '../components/template/LandingLogin';
import LandingSignup from '../components/template/LandingSignup';

const LandingPage = () => {
  return (
    <PageWrapper>
      {/* <LandingIntro /> */}
      {/* <LandingLogin /> */}
      <LandingSignup />
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
