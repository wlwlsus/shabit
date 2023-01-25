import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { theme } from '../../styles/GlobalStyles';

const Button = ({ bg, size, color, icon, onClick }) => {
  const bgClass = `bg-${bg}`;

  return (
    <ButtonWrapper className={`${bgClass} ${size} ${color}`} onClick={onClick}>
      {icon && <Icon>{icon}</Icon>}
    </ButtonWrapper>
  );
};

Button.propTypes = {
  bg: PropTypes.oneOf(['primary', 'secondary', 'white', 'black']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'white',
    'blue',
    'yellow',
    'green',
    'gray',
  ]),
  icon: PropTypes.element,
  shadow: PropTypes.oneOf(['shadow']),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  bg: undefined,
  size: 'sm',
  text: '',
  icon: null,
  shadow: undefined,
};

const ButtonWrapper = styled.button`
  display: inline-flex;
  background-color: transparent;

  &.primary {
    color: ${theme.color.primary};
  }

  &.secondary {
    color: ${theme.color.secondary};
  }

  &.white {
    color: ${theme.color.whiteColor};
  }

  &.gray {
    color: ${theme.color.grayColor};
  }

  &.blue {
    color: ${theme.color.blueColor};
  }

  &.yellow {
    color: ${theme.color.yellowColor};
  }

  &.green {
    color: ${theme.color.greenColor};
  }

  &.bg-primary {
    background-color: ${theme.color.primary};
  }

  &.bg-secondary {
    background-color: ${theme.color.secondary};
  }

  &.bg-white {
    background-color: ${theme.color.whiteColor};
  }

  &.bg-black {
    background-color: ${theme.color.blackColor};
  }

  &.xs {
    font-size: 0.7rem;
  }

  &.sm {
    font-size: 1rem;
  }

  &.md {
    font-size: 1.5rem;
  }

  &.lg {
    font-size: 3rem;
  }
`;

const Icon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Button;
