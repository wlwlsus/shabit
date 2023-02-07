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
import {
  fetchGoal,
  fetchTodayGoal,
  fetchTodayPostureTime,
} from '../../services/analyze/get';

export default function GoalContent() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  // const user = typedUseSelector((state) => {
  //   return state.auth.user;
  // });
  useEffect(() => {
    if (!user.email) return;
  }, [user.email]);

  const [todayGoal, setTodayGoal] = useState({ percentage: -1, time: -1 });
  const [todayTime, setTodayPostureTime] = useState({
    total: -1,
    time: [0, 0, 0, 0],
  });
  const [goal, setGoal] = useState({ percentage: -1, time: -1 });

  useEffect(() => {
    fetchTodayGoal(user.email).then((res) => {
      console.log(res);
      setTodayGoal(res);
    });
    fetchTodayPostureTime(user.email).then((res) => {
      console.log(res);
      setTodayPostureTime(res);
    });
    fetchGoal(user.email).then((res) => {
      console.log(res);
      setGoal(res);
    });
  }, []);

  return (
    <Wrapper>
      <GoalWrapper>
        {todayGoal.percentage != -1 && goal.percentage != -1 && (
          <GoalPercentage goal={goal.percentage} today={todayGoal.percentage} />
        )}
        {todayGoal.time != -1 && goal.time != -1 && (
          <GoalTime goal={goal.time} today={todayGoal.time} />
        )}
        <Score />
      </GoalWrapper>
      {todayTime.total != -1 && (
        <TimeData total={todayTime.total} time={todayTime.time} />
      )}
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
