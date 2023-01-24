import React from 'react';
import styled from 'styled-components';

import Text from '../atoms/Text';
import ArrowIcon from '../molecules/ArrowIcon';

const StartForm = () => {
  return (
    <Wrapper>
      <Text text={'지금 바로 시작하기'} color={'primary'} />
      <ArrowIcon size={'lg'} color={'primary'} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default StartForm;
