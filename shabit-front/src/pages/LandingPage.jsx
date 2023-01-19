import React from 'react';
import styled from 'styled-components';

import LandingTemplate from '../components/template/LandingTemplate';

const LandingPage = () => {
  return (
    <PageWrapper>
      <LandingTemplate />
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
