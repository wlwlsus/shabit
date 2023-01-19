import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { theme } from '../../styles/GlobalStyles';

const Button = ({
  bg,
  role,
  size,
  text,
  color,
  icon,
  shadow,
  p,
  onClick,
  children,
}) => {
  const bgClass = `bg-${bg}`;
  const padding = `p-${p}`;

  return (
    <ButtonWrapper
      type={role}
      className={`${bgClass} ${size} ${shadow} ${color} ${padding}`}
      onClick={onClick}
    >
      {icon && <Icon>{icon}</Icon>}
      <Text>{text}</Text>
      {children}
    </ButtonWrapper>
  );
};

Button.propTypes = {
  bg: PropTypes.oneOf(['primary', 'secondary']),
  role: PropTypes.oneOf(['button', 'submit']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  text: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary', 'white', 'blue', 'yellow']),
  icon: PropTypes.element,
  shadow: PropTypes.oneOf(['shadow']),
  padding: PropTypes.number,
  onClick: PropTypes.func,
  children: PropTypes.element,
};

Button.defaultProps = {
  bg: undefined,
  role: 'button',
  size: 'sm',
  text: '',
  icon: null,
  shadow: undefined,
  padding: undefined,
  onClick: undefined,
  children: undefined,
};

const ButtonWrapper = styled.button`
  display: inline-flex;
  background-color: transparent;
  border-radius: 0.3rem;

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

  &.bg-primary {
    background-color: ${theme.color.primary};
  }

  &.bg-secondary {
    background-color: ${theme.color.secondary};
  }

  &.bg-white {
    background-color: ${theme.color.whiteColor};
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

  &.shadow {
    box-shadow: 0 0.2rem 0.5rem ${theme.color.lightGrayColor};
  }

  &.p-1 {
    padding: 0.5rem;
  }
`;

const Text = styled.span`
  display: inline-block;
  text-align: center;
  flex: 1;
`;

const Icon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Button;
