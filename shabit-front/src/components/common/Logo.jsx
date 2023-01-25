import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Logo = ({ color, size }) => {
  const imgSrc = `${process.env.PUBLIC_URL}/assets/logo-${color}.png`;

  return <LogoWrapper src={imgSrc} className={size} />;
};

Logo.propTypes = {
  color: PropTypes.oneOf(['white', 'black', 'pink']),
  size: PropTypes.oneOf(['sm', 'lg']),
};

Logo.defaultProps = {
  color: 'white',
  size: 'sm',
};

const LogoWrapper = styled.img`
  display: inline-block;

  &.sm {
    width: 5rem;
  }

  &.lg {
    width: 10rem;
  }
`;

export default Logo;
