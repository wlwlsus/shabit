import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { theme } from '../../styles/GlobalStyles';

const Label = ({ size, text, color, bg, shadow, icon, onClick }) => {
  const bgClass = `bg-${bg}`;

  return (
    <LabelWrapper
      color={color}
      className={`${size} ${bgClass} ${shadow} ${color}`}
      onClick={onClick}
    >
      {icon && <Icon>{icon}</Icon>}
      <Text>{text}</Text>
    </LabelWrapper>
  );
};

Label.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary', 'white', 'gray', 'red']),
  background: PropTypes.oneOf(['primary', 'secondary', 'white']),
  icon: PropTypes.element,
  onClick: PropTypes.func,
};

Label.defaultProps = {
  size: 'sm',
  text: '',
  background: undefined,
  color: undefined,
  icon: null,
  onClick: undefined,
};

const LabelWrapper = styled.div`
  display: inline-block;
  vertical-align: baseline;
  color: ${theme.color.blackColor};
  background-color: 'none';
  font-weight: 600;

  &:hover {
    cursor: default;
  }

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

  &.red {
    color: ${theme.color.redColor};
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

  &.shadow {
    box-shadow: 0.2rem 0.2rem 0.2rem ${theme.color.lightGrayColor};
  }

  &.xs {
    font-size: 0.7rem;
  }

  &.sm {
    font-size: 0.9rem;
  }

  &.md {
    font-size: 1.5rem;
  }

  &.lg {
    font-size: 2rem;
  }
`;

const Text = styled.span`
  display: inline-block;
  text-align: center;
`;

const Icon = styled.span`
  display: inline-block;
  justify-content: center;
  align-items: center;
`;

export default Label;
