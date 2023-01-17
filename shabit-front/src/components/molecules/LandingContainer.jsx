import React from 'react';
import styled from 'styled-components';
import Container from '../atoms/Container';

const LandingContainer = ({ children1, children2 }) => {
  return (
    <ContainerWrapper>
      {children1}
      <Container
        shadow={'shadow'}
        border={'rounded'}
        size={'lg'}
        className="container"
      >
        <Container bg={'primary'} size={'square'} shadow={'shadow'}>
          {children2}
        </Container>
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

  & > div {
    position: relative;

    & > div {
      position: absolute;
      top: -10%;
      left: 15%;
    }
  }
`;

export default LandingContainer;
