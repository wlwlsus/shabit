import React from 'react';
import styled from 'styled-components';

import Label from '../atoms/Label';
import ArrowBtn from '../molecules/ArrowBtn';

const StartForm = () => {
  return (
    <Wrapper>
      <Label text={'지금 바로 시작하기'} size={'sm'} color={'primary'} />
      <ArrowBtn size={'lg'} color={'primary'} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default StartForm;
