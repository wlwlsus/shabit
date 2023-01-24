import React from 'react';
import styled from 'styled-components';

import Icon from '../atoms/Icon';

import { HiArrowRightCircle } from 'react-icons/hi2';

const ArrowBtn = ({ size, color }) => {
  return (
    <IconWrapper>
      <Icon icon={<HiArrowRightCircle />} size={size} color={color} />
    </IconWrapper>
  );
};

const IconWrapper = styled.div`
  margin: 1rem;
`;

export default ArrowBtn;
