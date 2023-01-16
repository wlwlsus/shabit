import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = ({ background, border, shadow, onClick, children }) => {
  const backgroundClass = `bg-${background}`;

  return (
    <ContainerWrapper
      className={`${backgroundClass} ${border} ${shadow}`}
      onClick={onClick}
    >
      {children}
    </ContainerWrapper>
  );
};

Container.propTypes = {
  background: PropTypes.oneOf(['primary', 'secondary']),
  border: PropTypes.oneOf(['rounded']),
  shadow: PropTypes.oneOf(['shadow']),
  onClick: PropTypes.func,
  children: PropTypes.element,
};

Container.defaultProps = {
  background: undefined,
  border: undefined,
  shadow: undefined,
  onClick: undefined,
  children: undefined,
};

const ContainerWrapper = styled.div`
  display: inline-flex;
  background-color: ${({ theme }) => theme.color.whiteColor};

  &.bg-primary {
    background-color: ${({ theme }) => theme.color.primary};
  }

  &.bg-secondary {
    background-color: ${({ theme }) => theme.color.secondary};
  }

  $.rounded {
    border-radius: 0.5rem;
  }

  $.shadow {
    box-shadow: 0.5rem 0.5rem 0.5rem ${({ theme }) => theme.color.shadowColor};
  }
`;

export default Container;
