import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import RangeBarDaily from '../Chart/RangeBarDaily';
import LineChart from '../Chart/LineChart';

export default function HistoryContent() {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>Today</Title>
        <Content>
          총 <P> 6시간 32분</P> 중, <P> 3시간 29분</P> 동안 바른 자세를
          유지하셨습니다
        </Content>
      </TitleWrapper>
      <RangeBarDaily />
      <Title>Weekly</Title>
      <LineChart />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-self: start;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  align-self: start;
  margin-left: 3rem;
  background-color: ${theme.color.secondary};
  color: ${theme.color.primary};
  font-weight: bold;
  font-size: 0.8rem;
  padding: 0.3rem;
  border-radius: 0.5rem;
  border: 0.1rem solid ${theme.color.primary};
  box-shadow: 0 0.1rem 0.5rem ${theme.color.lightGrayColor};
`;

const Content = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const P = styled.span`
  color: ${theme.color.primary};

  font-size: 1.05rem;
  margin: 0 0.3rem;
`;
