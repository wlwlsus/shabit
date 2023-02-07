import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import { loadEffect } from '../common/animation';

import { RxThickArrowRight } from 'react-icons/rx';
import ThemeBox from './ThemeBox';
import Logo from '../common/Logo';

export default function GoalPercentage({ today }) {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>목표 달성</Title>
      </TitleWrapper>
      <ContentWrapper>
        <DataWrapper>
          <Data>
            <P>나의 목표</P>
            <Percentage>{0}%</Percentage>
          </Data>
        </DataWrapper>
        <Arrow>
          <RxThickArrowRight />
        </Arrow>
        <DataWrapper>
          <Data>
            <P>오늘의 자세</P>
            <Percentage>
              {today}%
            </Percentage>
          </Data>
        </DataWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const TitleWrapper = styled.div`
  display: flex;
  position: absolute;
  align-self: start;
  align-items: center;
  top: 1.5rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  align-self: start;
  margin-left: 3rem;
  background-color: ${theme.color.secondary};
  color: ${theme.color.primary};
  font-weight: bold;
  padding: 0.3rem;
  border-radius: 0.5rem;
  border: 0.1rem solid ${theme.color.primary};
  box-shadow: 0 0.1rem 0.5rem ${theme.color.lightGrayColor};
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1.5rem;
  border: 0.2rem solid ${theme.color.secondary};
  box-shadow: 0 0.1rem 0.5rem ${theme.color.grayColor};
  animation: 0.8s ease-in ${loadEffect.down};
`;

const DataWrapper = styled.div`
  padding: 2rem;
  animation: 0.8s ease-in ${loadEffect.down};
`;

const P = styled.div`
  color: ${theme.color.blackColor};
  font-size: 0.75rem;
  font-weight: bold;
  margin: 0 0.3rem;
  position: relative;
`;

const Percentage = styled.span`
  color: ${theme.color.primary};
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0.3rem;
  position: relative;
`;

const Data = styled.div`
`;
const Arrow = styled.div`
  color: ${theme.color.secondary};

  & > svg {
    font-size: 3rem;
  }
`;