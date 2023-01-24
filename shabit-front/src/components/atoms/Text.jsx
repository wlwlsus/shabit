import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { theme } from '../../styles/GlobalStyles';

export default function Text({ text, color, bg }) {
  const bgClass = `bg-${bg}`;

  return <TextWrapper className={`${bgClass} } ${color}`}>{text}</TextWrapper>;
}

Text.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary', 'white', 'gray', 'red']),
  background: PropTypes.oneOf(['primary', 'secondary', 'white']),
};

Text.defaultProps = {
  text: '',
  background: undefined,
  color: undefined,
};

const TextWrapper = styled.span`
  background-color: transparent;

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
`;
