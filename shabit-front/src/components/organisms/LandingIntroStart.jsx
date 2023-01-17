import React from 'react';
import styled from 'styled-components';

import Label from '../atoms/Label';

import { HiArrowRightCircle } from 'react-icons/hi2';

const LandingIntroStart = () => {
  return (
    <Wrapper>
      <Label text={'지금 바로 시작하기'} size={'sm'} />
      <Label icon={<HiArrowRightCircle />} size={'lg'} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default LandingIntroStart;
