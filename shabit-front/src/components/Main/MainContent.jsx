import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

import UserInfo from './UserInfo';
import MainInfo from './MainInfo';
import Heatmap from '../Chart/Heatmap';

export default function MainContent() {
  return (
    <Wrapper>
      <InfoWrapper>
        <UserInfo />
        <MainInfo />
      </InfoWrapper>
      <HeatmapWrapper>
        <Heatmap />
      </HeatmapWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4rem 0 2rem 0;

  & > div:first-child {
    width: 40%;
  }

  & > div:last-child {
    width: 56.5%;
  }
`;

const HeatmapWrapper = styled.div`
  border: 0.2rem solid ${theme.color.secondary};
  border-radius: 1.5rem;
  box-shadow: 0 0.1rem 0.5rem ${theme.color.grayColor};

  & > div {
    margin: 1rem 1.5rem 0 1rem;
    margin-bottom: 0;
  }
`;
