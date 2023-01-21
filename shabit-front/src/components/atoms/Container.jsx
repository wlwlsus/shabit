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
  size: PropTypes.oneOf(['md', 'square']).isRequired,
  bg: PropTypes.oneOf(['primary', 'secondary']),
  border: PropTypes.oneOf(['rounded']),
  shadow: PropTypes.oneOf(['shadow']),
  edge: PropTypes.oneOf(['secondary']),
  onClick: PropTypes.func,
  children: PropTypes.element,
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

  &.shadow {
    box-shadow: 0 0.1rem 0.5rem ${theme.color.grayColor};
  }

  &.edge-secondary {
    border: 0.2rem solid ${theme.color.secondary};
  }

  &.md {
    width: 28rem;
    height: 25rem;
  }

  &.square {
    width: 27rem;
    height: 27rem;
  }
`;

export default Container;
