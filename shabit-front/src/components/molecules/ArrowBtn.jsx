import React from 'react';
import styled from 'styled-components';

import Button from '../atoms/Button';

import { HiArrowRightCircle } from 'react-icons/hi2';

const ArrowBtn = ({ size, color }) => {
  return (
    <ButtonWrapper>
      <Button icon={<HiArrowRightCircle />} size={size} color={color} />
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  margin: 1rem;
`;

export default ArrowBtn;
