import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Container from '../atoms/Container';

const LandingContainer = ({ children1, children2, children3 }) => {
  return (
    <ContainerWrapper>
      <Container shadow={'shadow'} border={'rounded'} size={'md'}>
        {children1}
      </Container>

      <Container bg={'primary'} size={'square'} shadow={'shadow'}>
        {children2}
      </Container>

      <Container shadow={'shadow'} border={'rounded'} size={'md'}>
        {children3}
      </Container>
    </ContainerWrapper>
  );
};

LandingContainer.propTypes = {
  children1: PropTypes.element,
  children2: PropTypes.element,
  children3: PropTypes.element,
};

LandingContainer.defaultProps = {
  children1: undefined,
  children2: undefined,
  children3: undefined,
};

const ContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;

  & > div {
    &:nth-child(2) {
      position: absolute;
      top: -4%;
      left: 12%;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default LandingContainer;
