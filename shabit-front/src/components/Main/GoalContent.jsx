import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import { loadEffect } from '../common/animation';

import GoalPercentage from './GoalPercentage';
import GoalTime from './GoalTime';
import Score from './Score';
import TimeData from './TimeData';

import { typedUseSelector } from '../../store';
// import { setUserState } from '../../store/authSlice';
import { fetchTodayGoal } from '../../services/analyze/get';

export default function GoalContent() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  // const user = typedUseSelector((state) => {
  //   return state.auth.user;
  // });
  useEffect(() => {
    if (!user.email) return;
  }, [user.email]);

  const [today, setTodayGoal] = useState(0);

  useEffect(() => {
    fetchTodayGoal(user.email).then((res) => {
      setTodayGoal(res);
    });
    // fetchTimes(user.email).then((res) => {
    //   setTimeData(res);
    // });
  }, []);

  return (
    <Wrapper>
      <GoalWrapper>
        <GoalPercentage today={today.percentage} />
        <GoalTime today={today.time} />
        <Score />
      </GoalWrapper>
      <TimeData today={today.percentage} />
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const GoalWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin: 0.6rem 0 0 0;

  & > div {
    width: 40%;
  }

  & > div:last-child {
    width: 15%;
  }
`;
