import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import { loadEffect } from '../common/animation';

import UserInfo from './UserInfo';
import MainInfo from './MainInfo';
import Heatmap from '../Chart/Heatmap';
import HeatmapScale from './HeatmapScale';

import { typedUseSeletor } from '../../store';

import { fetchHeatmap, fetchQuote } from '../../services/stat/get';
import UploadingModal from './UploadingModal';

export default function MainContent() {
  const heatMapSeries = typedUseSeletor((state) => {
    return state.chart.heatMapSeries;
  });

  const [lastDate, setLastDate] = useState(heatMapSeries.slice(-1)[0]?.date);
  const [isUploading, setIsUploading] = useState(false);
  const randomQuote = typedUseSeletor((state) => {
    return state.chart.randomQuote;
  });
  const user = typedUseSeletor((state) => {
    return state.auth.user;
  });

  useEffect(() => {
    if (user.email) {
      Promise.allSettled([fetchHeatmap(user.email), fetchQuote()]);
    }
  }, [user]);

  useEffect(() => {
    setLastDate(heatMapSeries.slice(-1)[0]?.date);
  }, [heatMapSeries]);

  const isModalOpen = (boolean?) => {
    if (typeof boolean === 'boolean') setIsUploading(boolean);
    else setIsUploading(!isUploading);
  };
  return (
    <Wrapper>
      {!isUploading ? (
        <div></div>
      ) : (
        <UploadingModal isModalOpen={isModalOpen} />
      )}
      <InfoWrapper>
        <UserInfo user={user} lastDate={lastDate} isModalOpen={isModalOpen} />
        <MainInfo randomQuote={randomQuote} />
      </InfoWrapper>
      <HeatmapWrapper>
        <Heatmap heatMapSeries={heatMapSeries} />
        <HeatmapScale />
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

  display: flex;
  flex-direction: column;

  animation: 0.8s ease-in ${loadEffect.up};
  position: relative;

  & > div:nth-child(1) {
    margin: 1rem 1.5rem 0 1rem;
  }

  & > div:nth-child(2) {
    position: absolute;
    bottom: 9%;
    left: 80%;
  }
`;
