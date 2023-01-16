import React from 'react';
import styled from 'styled-components';
import Container from '../atoms/Container';

const LandingContainer = () => {
  return (
    <ContainerWrapper>
      <Container shadow={'shadow'} border={'rounded'} size={'lg'}>
        <Container bg={'primary'} size={'square'} />
      </Container>
    </ContainerWrapper>
  );
};

const ContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LandingContainer;
