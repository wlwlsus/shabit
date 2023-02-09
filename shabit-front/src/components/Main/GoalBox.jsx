import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { loadEffect } from '../common/animation';
import { useSelector } from 'react-redux';

import { RxThickArrowRight } from 'react-icons/rx';
import { HiPencilAlt } from 'react-icons/hi';
import ThemeBox from './ThemeBox';
import Logo from '../common/Logo';

import { useDispatch } from 'react-redux';
import { setGoalModal } from '../../store/goalSlice';

export default function GoalBox({ today }) {
  const dispatch = useDispatch();
  const percentage = useSelector((state) => {
    return state.goal.percentage;
  });
  const time = useSelector((state) => {
    return state.goal.time;
  });

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>목표 달성</Title>
      </TitleWrapper>
      <IconWrapper>
        <HiPencilAlt
          onClick={() => {
            dispatch(setGoalModal(true));
          }}
        />
      </IconWrapper>
      <ContentWrapper>
        <DataWrapper>
          <Data>
            <P>나의 목표</P>
            <Goal>{percentage}%</Goal>
          </Data>
          <Arrow>
            <RxThickArrowRight />
          </Arrow>
          <Data>
            <P>오늘의 자세</P>
            <Today>{today.percentage}%</Today>
          </Data>
        </DataWrapper>
        <DataWrapper>
          <Data>
            <P>나의 목표</P>
            <Goal>{time}분</Goal>
          </Data>
          <Arrow>
            <RxThickArrowRight />
          </Arrow>
          <Data>
            <P>오늘의 자세</P>
            <Today>{today.time}분</Today>
          </Data>
        </DataWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 1rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  position: absolute;
  align-self: start;
  align-items: center;
  top: 4.75rem;
  animation: 0.8s ease-in ${loadEffect.down};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3rem;
  background-color: ${(props) => props.theme.color.secondary};
  color: ${(props) => props.theme.color.primary};
  font-weight: bold;
  padding: 0.3rem;
  border-radius: 0.5rem;
  border: 0.1rem solid ${(props) => props.theme.color.primary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1.5rem;
  border: 0.2rem solid ${(props) => props.theme.color.secondary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.grayColor};
  padding: 0 2rem;
  animation: 0.8s ease-in ${loadEffect.down};
`;

const DataWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  width: 45%;
  animation: 0.8s ease-in ${loadEffect.down};
`;

const P = styled.div`
  color: ${(props) => props.theme.color.blackColor};
  font-size: 0.75rem;
  font-weight: bold;
  margin: 0 0.3rem;
  position: relative;
`;

const Goal = styled.span`
  color: ${(props) => props.theme.color.darkGrayColor};
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0.3rem;
  position: relative;
`;

const Today = styled.span`
  color: ${(props) => props.theme.color.primary};
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0.3rem;
  position: relative;
`;

const Data = styled.div``;
const Arrow = styled.div`
  color: ${(props) => props.theme.color.secondary};

  & > svg {
    font-size: 3rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 6.5rem;
  right: 3rem;
  color: ${(props) => props.theme.color.primary};
  font-weight: bold;
  padding: 0.3rem;
  font-size: 1.5rem;
  animation: 0.8s ease-in ${loadEffect.down};

  &:hover {
    cursor: pointer;
  }
`;
