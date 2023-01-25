import React from 'react';
import styled from 'styled-components';

import UserInfo from './UserInfo';
import MainInfo from './MainInfo';
import HeatmapBox from './HeatmapBox';

export default function MainContent() {
  return (
    <Wrapper>
      <InfoWrapper>
        <UserInfo />
        <MainInfo />
      </InfoWrapper>
      <HeatmapBox />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;

  & > div:first-child {
    width: 30%;
  }

  & > div:last-child {
    width: 60%;
  }
`;
