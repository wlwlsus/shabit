import React from 'react';
import styled from 'styled-components';

import Container from '../components/atoms/Container';

export default function LandingPage({ children }) {
  const [nav, content, form] = children;

  return (
    <PageWrapper>
      <ContainerWrapper>
        <Container shadow={'shadow'} border={'rounded'} size={'md'}>
          {nav}
        </Container>
        <Container bg={'primary'} size={'square'} shadow={'shadow'}>
          {content}
        </Container>
        <Container shadow={'shadow'} border={'rounded'} size={'md'}>
          {form}
        </Container>
      </ContainerWrapper>
    </PageWrapper>
  );
}

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  & > div:first-child {
    padding: 3.5rem 1rem;
  }

  & > div:nth-child(2) {
    position: absolute;
    left: 12%;
  }

  & > div:last-child {
    margin-left: 2.5rem;
  }
`;

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
