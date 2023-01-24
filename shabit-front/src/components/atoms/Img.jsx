import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Img = ({ assets, src, size }) => {
  const imgSrc = assets === true ? `${process.env.PUBLIC_URL}${src}` : src;

  return <ImgWrapper src={imgSrc} className={`${size}`}></ImgWrapper>;
};

Img.propTypes = {
  assets: PropTypes.bool.isRequired,
  src: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
};

Img.defaultProps = {
  assets: false,
  src: undefined,
  size: 'sm',
};

const ImgWrapper = styled.img`
  display: inline-block;
  width: 100%;
  height: 100%;
  object-fit: contain;

  &.sm {
    width: 5rem;
  }

  &.lg {
    width: 10rem;
  }
`;

export default Img;
