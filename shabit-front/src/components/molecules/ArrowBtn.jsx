import React from 'react';

import Button from '../atoms/Button';

import { HiArrowRightCircle } from 'react-icons/hi2';

const ArrowBtn = ({ size }) => {
  console.log(size);
  return <Button icon={<HiArrowRightCircle />} size={size} />;
};

export default ArrowBtn;
