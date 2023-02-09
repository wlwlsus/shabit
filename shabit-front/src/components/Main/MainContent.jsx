import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { loadEffect } from '../common/animation';

import UserInfo from './UserInfo';
import QuoteInfo from './QuoteInfo';
import Heatmap from '../Chart/Heatmap';
import HeatmapScale from './HeatmapScale';

import { typedUseSelector } from '../../store';
import { fetchHeatmap, fetchQuote } from '../../services/stat/get';
// import { setUserState } from '../../store/authSlice';
import UploadingModal from './UploadingModal';
import LogoutButton from './LogoutButton';
import { shallowEqual } from 'react-redux';
import MoveToAdmin from '../Admin/MoveToAdmin';

export default function MainContent({ setTheme }) {
  const [lastDate, setLastDate] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // const user = JSON.parse(sessionStorage.getItem('user'));
  const user = typedUseSelector((state) => {
    return state.auth.user;
  }, shallowEqual);
  useEffect(() => {
    if (!user.email) return;
    Promise.allSettled([fetchHeatmap(user.email), fetchQuote()]);
  }, [user.email]);

  const heatmap = typedUseSelector((state) => {
    return state.chart.heatmapData;
  });

  useEffect(() => {
    setLastDate(heatmap.slice(-1)[0]?.date);
  }, [heatmap]);

  // console.log(heatmapData);

  const isModalOpen = (boolean) => {
    if (typeof boolean === 'boolean') setIsUploading(boolean);
    else setIsUploading(!isUploading);
  };

  return (
    <Wrapper>
      <LogoutButton />
      <MoveToAdmin />
      {!isUploading ? <></> : <UploadingModal isModalOpen={isModalOpen} />}
      <InfoWrapper>
        <UserInfo
          user={user}
          lastDate={lastDate}
          isModalOpen={isModalOpen}
          setTheme={setTheme}
        />
        <QuoteInfo />
      </InfoWrapper>
      <HeatmapWrapper>
        <Heatmap />
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
  border: 0.2rem solid ${(props) => props.theme.color.secondary};
  border-radius: 1.5rem;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.grayColor};

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
