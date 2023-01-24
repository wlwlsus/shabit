import React from 'react';
import styled from 'styled-components';

import Container from '../atoms/Container';
import Text from '../atoms/Text';
import StartIcon from '../molecules/StartIcon';
import InfoBox from '../molecules/InfoBox';

import { FiAlertCircle } from 'react-icons/fi';

export default function MainInfo() {
  return (
    <Container border={'rounded'} shadow={'shadow'} edge={'secondary'}>
      <Wrapper>
        <InfoWrapper>
          <InfoBox icon={<FiAlertCircle />} text={'알고 계셨나요?'} />
          <Text text={'random health quotes'} color={'primary'} />
        </InfoWrapper>
        <Container border={'rounded'} shadow={'shadow'} edge={'secondary'}>
          <StartIcon />
          <Text text={'자세교정 시작하기'} color={'primary'} />
        </Container>
      </Wrapper>
    </Container>
  );
}

const Wrapper = styled.div`
  width: 50%;
  display: flex;

  & > div:first-child {
    width: 70%;
  }

  & > div:last-child {
    width: 30%;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
