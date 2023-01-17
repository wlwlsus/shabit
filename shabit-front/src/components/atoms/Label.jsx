import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Label = ({ size, text, color, bg, shadow, icon, onClick }) => {
  const bgClass = `bg-${bg}`;

  return (
    <LabelWrapper color={color} className={`${size} ${bgClass} ${shadow}`}>
      {icon && <Icon>{icon}</Icon>}
      <Text>{text}</Text>
    </LabelWrapper>
  );
};

Label.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
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
  color: ${(props) => props.color || 'black'};
  background-color: 'none';

  &.bg-primary {
    background-color: ${({ theme }) => theme.color.primary};
  }

  &.bg-secondary {
    background-color: ${({ theme }) => theme.color.secondary};
  }

  &.bg-white {
    background-color: ${({ theme }) => theme.color.whiteColor};
  }

  &.shadow {
    box-shadow: 0.2rem 0.2rem 0.2rem ${({ theme }) => theme.color.shadowColor};
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
