import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import RangeBarDaily from '../Chart/RangeBarDaily';
import LineChart from '../Chart/LineChart';
import { TiArrowSortedDown } from 'react-icons/ti';

export default function HistoryContent() {
  const [dropDown, setDropDown] = useState(0);
  const [mode, setMode] = useState('Weekly');

  const handleDropdown = () => {
    if (dropDown === 1) {
      setDropDown(0);
    } else {
      setDropDown(1);
    }
  };

  const handleMode = (e) => {
    setMode(e.target.innerText);
    setDropDown(0);
  };

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
      <Title onClick={handleDropdown}>
        <span>
          {mode}
          <TiArrowSortedDown />
        </span>
      </Title>
      <DropDown style={{ opacity: dropDown }}>
        <li onClick={handleMode}>Weekly</li>
        <li onClick={handleMode}>Monthly</li>
      </DropDown>
      <LineChart mode={mode} />
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

  &:hover {
    cursor: default;
  }

  & > span {
    &:hover {
      cursor: pointer;
    }
  }
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
  position: relative;
`;

const DropDown = styled.ul`
  list-style: none;
  position: absolute;
  left: 7.3%;
  top: 41.5%;
  z-index: 1;
  transition: all 0.1s linear 0.1s;

  & > li {
    border: 0.1rem solid ${theme.color.primary};
    border-radius: 0.5rem;
    padding: 0.3rem 0.5rem;
    background-color: ${theme.color.secondary};
    color: ${theme.color.primary};
    font-weight: bold;

    &:hover {
      cursor: pointer;
    }
  }
`;
