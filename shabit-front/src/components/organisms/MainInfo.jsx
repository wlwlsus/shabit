import React from 'react';
import styled from 'styled-components';

import Container from '../atoms/Container';
import Text from '../atoms/Text';
import StartStretch from '../molecules/StartStretch';
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
        <StartStretch />
      </Wrapper>
    </Container>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
