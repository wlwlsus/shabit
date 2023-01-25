import React from 'react';

import Container from '../atoms/Container';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

import { BsFillCaretRightSquareFill } from 'react-icons/bs';
import styled from 'styled-components';

export default function StartStretch() {
  return (
    <Wrapper border={'rounded'} shadow={'shadow'} edge={'secondary'}>
      <Icon
        icon={<BsFillCaretRightSquareFill />}
        color={'primary'}
        size={'lg'}
      />
      <Text text={'자세교정 시작하기'} color={'primary'} />
    </Wrapper>
  );
}

const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
`;
