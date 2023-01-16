import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = ({ size, bg, border, shadow, onClick, children }) => {
  const bgClass = `bg-${bg}`;

  return (
    <ContainerWrapper
      className={` ${size} ${bgClass} ${border} ${shadow}`}
      onClick={onClick}
    >
      {children}
    </ContainerWrapper>
  );
};

Container.propTypes = {
  size: PropTypes.oneOf(['lg', 'square']).isRequired,
  bg: PropTypes.oneOf(['primary', 'secondary']),
  border: PropTypes.oneOf(['rounded']),
  shadow: PropTypes.oneOf(['shadow']),
  onClick: PropTypes.func,
  children: PropTypes.element,
};

Container.defaultProps = {
  size: undefined,
  bg: undefined,
  border: undefined,
  shadow: undefined,
  onClick: undefined,
  children: undefined,
};

const ContainerWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.whiteColor};

  &.bg-primary {
    background-color: ${({ theme }) => theme.color.primary};
  }

  &.bg-secondary {
    background-color: ${({ theme }) => theme.color.secondary};
  }

  &.rounded {
    border-radius: 0.5rem;
  }

  &.shadow {
    box-shadow: 0.3rem 0.3rem 0.3rem ${({ theme }) => theme.color.shadowColor};
  }

  &.lg {
    width: 70rem;
    height: 30rem;
  }

  &.square {
    width: 35rem;
    height: 35rem;
  }
`;

export default Container;
