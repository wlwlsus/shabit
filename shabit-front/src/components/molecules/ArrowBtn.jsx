import React from 'react';
import PropTypes from 'prop-types';

import Label from '../atoms/Label';

import { HiArrowRightCircle } from 'react-icons/hi2';

const ArrowBtn = ({ size }) => {
  return <Label icon={<HiArrowRightCircle />} size={size} />;
};

ArrowBtn.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

ArrowBtn.defaultProps = {
  size: 'sm',
};

export default ArrowBtn;
