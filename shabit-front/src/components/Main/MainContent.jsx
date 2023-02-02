import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import { loadEffect } from '../common/animation';

import UserInfo from './UserInfo';
import QuoteInfo from './QuoteInfo';
import Heatmap from '../Chart/Heatmap';
import HeatmapScale from './HeatmapScale';

// import { typedUseSelector } from '../../store';

import UploadingModal from './UploadingModal';
import LogoutButton from './LogoutButton';

export default function MainContent() {
  // const [lastDate, setLastDate] = useState(heatMapSeries.slice(-1)[0]?.date);
  const [isUploading, setIsUploading] = useState(false);

  const user = JSON.parse(sessionStorage.getItem('user'));

  // const user = typedUseSelector((state) => {
  //   return state.auth.user;
  // });

  // useEffect(() => {
  //   if (user.email) {
  //     Promise.allSettled([fetchHeatmap(user.email), fetchQuote()]);
  //   }
  // }, [user]);

  // useEffect(() => {
  //   setLastDate(heatMapSeries.slice(-1)[0]?.date);
  // }, [heatMapSeries]);

  const isModalOpen = (boolean) => {
    if (typeof boolean === 'boolean') setIsUploading(boolean);
    else setIsUploading(!isUploading);
  };
  return (
    <Wrapper>
      <LogoutButton />
      {!isUploading ? <></> : <UploadingModal isModalOpen={isModalOpen} />}
      <InfoWrapper>
        <UserInfo user={user} isModalOpen={isModalOpen} />
        <QuoteInfo />
      </InfoWrapper>
      <HeatmapWrapper>
        <Heatmap user={user} />
        <HeatmapScale />
      </HeatmapWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const InfoWrapper = styled.div`
  display: flex;
  flex: 1;
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
