import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

const Container = ({ size, bg, border, shadow, edge, onClick, children }) => {
  const bgClass = `bg-${bg}`;
  const edgeClass = `edge-${edge}`;

  return (
    <ContainerWrapper
      className={` ${size} ${bgClass} ${border} ${shadow} ${edgeClass}`}
      onClick={onClick}
    >
      {children}
    </ContainerWrapper>
  );
};

Container.propTypes = {
  size: PropTypes.oneOf(['md', 'lg', 'square', 'circle']),
  bg: PropTypes.oneOf(['primary', 'secondary']),
  border: PropTypes.oneOf(['rounded', 'main']),
  shadow: PropTypes.oneOf(['shadow']),
  edge: PropTypes.oneOf(['secondary']),
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.object,
  ]),
};

Container.defaultProps = {
  size: undefined,
  bg: undefined,
  border: undefined,
  shadow: undefined,
  onClick: undefined,
  edge: undefined,
  children: undefined,
};

const ContainerWrapper = styled.div`
  background-color: ${theme.color.whiteColor};

  &.bg-primary {
    background-color: ${theme.color.primary};
  }

  &.bg-secondary {
    background-color: ${theme.color.secondary};
  }

  &.rounded {
    border-radius: 1.5rem;
  }

  &.main {
    border-radius: 0 1.5rem 1.5rem;
  }

  &.shadow {
    box-shadow: 0 0.1rem 0.5rem ${theme.color.grayColor};
  }

  &.edge-secondary {
    border: 0.2rem solid ${theme.color.secondary};
  }

  &.square {
    width: 27rem;
    height: 27rem;
  }

  &.circle {
    width: 8.5rem;
    height: 8.5rem;
    border-radius: 50%;
  }

  &.md {
    width: 28rem;
    height: 25rem;
  }

  &.lg {
    width: 70rem;
    height: 37rem;
  }
`;

export default Container;
