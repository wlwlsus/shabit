import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = ({ background, type, role, text, icon, onClick, children }) => {
  const typeClass = `${type}-btn`;
  const backgroundClass = `bg-${background}`;

  return (
    <ButtonWrapper
      type={role}
      className={`${backgroundClass} ${typeClass}`}
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
  type: PropTypes.oneOf(['round', 'square']),
  role: PropTypes.oneOf(['button', 'submit']),
  text: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func,
  children: PropTypes.element,
};

Button.defaultProps = {
  background: undefined,
  type: 'square',
  role: 'button',
  text: '',
  icon: null,
  onClick: undefined,
  children: undefined,
};

const ButtonWrapper = styled.button`
  display: inline-flex;
  background-color: ${({ theme }) => theme.color.whiteColor};

  &.bg-primary {
    background-color: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.secondary};
  }

  &.bg-secondary {
    background-color: ${({ theme }) => theme.color.secondary};
    color: ${({ theme }) => theme.color.primary};
  }

  &.round {
    border-radius: 1rem;
  }

  .&square {
    border-radius: 0.2rem;
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
