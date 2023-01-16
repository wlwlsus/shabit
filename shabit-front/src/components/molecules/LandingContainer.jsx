import React from 'react';
import styled from 'styled-components';
import Container from '../atoms/Container';

const LandingContainer = () => {
  return (
    <ContainerWrapper>
      <Container background={'primary'}></Container>
      <Container shadow={'shadow'} border={'rounded'}></Container>
    </ContainerWrapper>
  );
};

const ContainerWrapper = styled.div``;

export default LandingContainer;
