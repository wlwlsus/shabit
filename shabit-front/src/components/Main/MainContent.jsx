import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

import UserInfo from './UserInfo';
import MainInfo from './MainInfo';
import Heatmap from '../Chart/Heatmap';

import { typedUseSeletor } from '../../store';

import { fetchHeatmap, fetchQuote } from '../../services/stat/get';

export default function MainContent() {
  const heatMapSeries = typedUseSeletor((state) => {
    return state.chart.heatMapSeries;
  });

  const [lastDate, setLastDate] = useState(heatMapSeries.slice(-1)[0]?.date);

  const randomQuote = typedUseSeletor((state) => {
    return state.chart.randomQuote;
  });
  const user = typedUseSeletor((state) => {
    return state.auth.user;
  });

  useEffect(() => {
    Promise.allSettled([fetchHeatmap(user.email), fetchQuote()]);
  }, [user]);

  useEffect(() => {
    setLastDate(heatMapSeries.slice(-1)[0]?.date);
  }, [heatMapSeries]);

  return (
    <Wrapper>
      <InfoWrapper>
        <UserInfo user={user} lastDate={lastDate} />
        <MainInfo randomQuote={randomQuote} />
      </InfoWrapper>
      <HeatmapWrapper>
        <Heatmap heatMapSeries={heatMapSeries} />
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
