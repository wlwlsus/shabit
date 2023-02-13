import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Logo from '../common/Logo';
import { RiDownload2Line } from 'react-icons/ri';

import { setPercentage, setTime } from '../../store/goalSlice';
import GoalBox from './GoalBox';
import TimeData from './TimeData';

import * as htmlToImage from 'html-to-image';

import {
  fetchGoal,
  fetchTodayGoal,
  fetchTodayPostureTime,
} from '../../services/goal/get';

export default function GoalContent() {
  const logoColor = Number(localStorage.getItem('theme')) ? 'black' : 'pink';
  const user = JSON.parse(sessionStorage.getItem('user'));
  useEffect(() => {
    if (!user.email) return;
  }, [user.email]);

  const dispatch = useDispatch();
  const [todayGoal, setTodayGoal] = useState({ percentage: -1, time: -1 });
  const [todayTime, setTodayPostureTime] = useState({
    total: -1,
    time: [0, 0, 0, 0],
  });

  useEffect(() => {
    const mounted = async () => {
      fetchTodayGoal(user.email).then((res) => {
        setTodayGoal(res);
      });
      fetchTodayPostureTime(user.email).then((res) => {
        setTodayPostureTime(res);
      });
      fetchGoal(user.email).then((res) => {
        dispatch(setPercentage(res.percentage));
        dispatch(setTime(res.time));
      });
    };
    mounted();
  }, []);

  const saveAs = (blob, fileName) => {
    var elem = window.document.createElement('a');
    elem.href = blob;
    elem.download = fileName;
    elem.style = 'display:none;';
    (document.body || document.documentElement).appendChild(elem);
    if (typeof elem.click === 'function') {
      elem.click();
    } else {
      elem.target = '_blank';
      elem.dispatchEvent(
        new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
        }),
      );
    }
    URL.revokeObjectURL(elem.href);
    elem.remove();
  };

  const exportAsPicture = () => {
    var data = document.getElementsByTagName('body')[0];

    htmlToImage.toPng(data).then((dataUrl) => {
      saveAs(dataUrl, 'SHabit.png');
    });
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <Blank></Blank>
        <P>{user.nickname} 님</P>
        <ShareButton>
          <RiDownload2Line onClick={exportAsPicture} />
        </ShareButton>
      </HeaderWrapper>
      <GoalWrapper>
        <ImageWrapper>
          <Logo color={logoColor} size={'lg'} />
        </ImageWrapper>
        {todayGoal.time != -1 && <GoalBox today={todayGoal} />}
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
  clear: both;

  & > div:nth-child(1) {
    width: 15%;
  }

  & > div:nth-child(2) {
    width: 80%;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  float: right;
  width: 100%;
`;
const ImageWrapper = styled.div`
  padding-left: 1rem;
`;

const Button = styled.div`
  padding: 0.3rem;
  font-size: 1.75rem;

  transition: all 0.1s linear;

  &:hover {
    cursor: pointer;
    transform: scale(1.15);
  }
`;

const ShareButton = styled(Button)`
  color: ${(props) => props.theme.color.primary};
  margin: 0 1rem;
`;

const P = styled.div`
  color: ${(props) => props.theme.color.blackColor};
  font-size: 1.75rem;
  font-weight: bold;
`;

const Blank = styled.div`
  margin: 0 1.75rem;
`;
