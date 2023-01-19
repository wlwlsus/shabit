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
  onClick,
  children,
}) => {
  const bgClass = `bg-${bg}`;

  return (
    <ButtonWrapper
      type={role}
      className={`${bgClass} ${size} ${shadow} ${color}`}
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
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  text: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary', 'white']),
  icon: PropTypes.element,
  shadow: PropTypes.oneOf(['shadow']),
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
  onClick: undefined,
  children: undefined,
};

const ButtonWrapper = styled.button`
  display: inline-flex;
  border-radius: 0.5rem;
  padding: 0.5rem;
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

  &.bg-primary {
    background-color: ${theme.color.primary};
  }

  &.bg-secondary {
    background-color: ${theme.color.secondary};
  }

  &.bg-white {
    background-color: ${theme.color.whiteColor};
  }

  &.gray {
    color: ${theme.color.grayColor};
  }

  &.sm {
    font-size: 1rem;
  }

  &.md {
    font-size: 1.8rem;
  }

  &.lg {
    font-size: 3rem;
  }

  &.shadow {
    box-shadow: 0 0.2rem 0.5rem ${theme.color.lightGrayColor};
  }
`;

const Text = styled.span`
  display: inline-block;
  text-align: center;
  flex: 1;
`;

const Icon = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export default Button;
