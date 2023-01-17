import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = ({ bg, role, size, text, icon, onClick, children }) => {
  const bgClass = `bg-${bg}`;

  return (
    <ButtonWrapper
      type={role}
      className={`${bgClass} ${size}`}
      onClick={onClick}
    >
      {icon && <Icon>{icon}</Icon>}
      <Text>{text}</Text>
      {children}
    </ButtonWrapper>
  );
};

Button.propTypes = {
  background: PropTypes.oneOf(['primary', 'secondary']),
  role: PropTypes.oneOf(['button', 'submit']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  text: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func,
  children: PropTypes.element,
};

Button.defaultProps = {
  background: undefined,
  role: 'button',
  size: 'sm',
  text: '',
  icon: null,
  onClick: undefined,
  children: undefined,
};

const ButtonWrapper = styled.button`
  display: inline-flex;
  background-color: ${({ theme }) => theme.color.whiteColor};
  border-radius: 1rem;

  &.bg-primary {
    background-color: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.secondary};
  }

  &.bg-secondary {
    background-color: ${({ theme }) => theme.color.secondary};
    color: ${({ theme }) => theme.color.primary};
  }

  &.sm {
    font-size: 1rem;
    width: 1rem;
  }

  &.md {
    font-size: 2rem;
    width: 2rem;
  }

  &.lg {
    font-size: 3rem;
    width: 3rem;
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
