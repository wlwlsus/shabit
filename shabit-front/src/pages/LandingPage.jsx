import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';

import Navbar from '../components/Landing/Navbar';

export default function LandingPage({ children }) {
  const [content, form] = children;

  return (
    <PageWrapper>
      <ContainerWrapper>
        <NavContainer>
          <Navbar />
        </NavContainer>
        <ContentContainer>{content}</ContentContainer>
        <FormContainer>{form}</FormContainer>
      </ContainerWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const NavContainer = styled.div`
  width: 28rem;
  height: 25rem;
  background-color: ${theme.color.whiteColor};
  border-radius: 1.5rem;
`;

const ContentContainer = styled.div`
  width: 27rem;
  height: 27rem;
  background-color: ${theme.color.primary};

  position: absolute;
  left: 12%;
`;

const FormContainer = styled(NavContainer)`
  margin-left: 2.5rem;
`;
