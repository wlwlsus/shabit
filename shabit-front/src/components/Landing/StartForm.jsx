import React from 'react';
import styled from 'styled-components';

import ArrowBtn from '../common/ArrowIcon';

const StartForm = () => {
  return (
    <Wrapper>
      <span>지금 바로 시작하기</span>
      <ArrowBtn />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default StartForm;
