import React from 'react';

import Label from '../atoms/Label';

import { BsFillCheckCircleFill } from 'react-icons/bs';

const CheckIcon = ({ color }) => {
  return <Label icon={<BsFillCheckCircleFill />} color={color} />;
};

export default CheckIcon;
