import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import { loadEffect } from '../common/animation';
import BarChart from '../Chart/BarChart';
import LineChart from '../Chart/LineChart';
import { TiArrowSortedDown } from 'react-icons/ti';
import { fetchWeekly, fetchMonthly } from '../../services/stat/get';
// import { typedUseSelector } from '../../store';

export default function HistoryContent() {
  const [lineData, setLineData] = useState([]);
  const [dropDown, setDropDown] = useState('none');
  const [mode, setMode] = useState('Weekly');
  const [item, setItem] = useState('Monthly');
  const [page, setPage] = useState(0);

  const user = JSON.parse(sessionStorage.getItem('user'));

  // const user = typedUseSelector((state) => {
  //   return state.auth.user;
  // });

  // useEffect(() => {
  //   if (!user.email) return;
  //   Promise.allSettled([
  //     fetchWeekly(user.email, page),
  //     fetchMonthly(user.email, page),
  //   ]);
  // }, [user.email]);

  useEffect(() => {
    if (!user.email) return;
    if (mode === 'Weekly') {
      fetchWeekly(user.email, page).then((res) => {
        // 빈 데이터가 오면 +1이 되게
        setLineData(res);
      });
    } else {
      fetchMonthly(user.email, page).then((res) => {
        setLineData(res);
      });
    }
  }, [user.email, mode, page]);

  const handleDropdown = () => {
    if (dropDown === '') {
      setDropDown('none');
    } else {
      setDropDown('');
    }
  };

  const handleMode = (e) => {
    const selected = e.target.innerText;
    setMode(e.target.innerText);
    setDropDown('none');
    switch (selected) {
      case 'Weekly':
        setItem('Monthly');
        break;
      case 'Monthly':
        setItem('Weekly');
        break;
      default:
        setItem('Monthly');
        break;
    }
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

      <ChartWrapper>
        <BarChart user={user} />
      </ChartWrapper>

      <DropDownWrapper>
        <DropDown onClick={handleDropdown}>
          {mode}
          <TiArrowSortedDown />
        </DropDown>
        <DropDownItem onClick={handleMode} style={{ display: dropDown }}>
          {item}
        </DropDownItem>
      </DropDownWrapper>
      <LineChart
        user={user}
        mode={mode}
        lineData={lineData}
        page={page}
        setPage={setPage}
      />
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

const ChartWrapper = styled.div`
  animation: 0.8s ease-in ${loadEffect.down};
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
`;

const Content = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-left: 1rem;

  animation: 0.8s ease-in ${loadEffect.down};
`;

const P = styled.span`
  color: ${theme.color.primary};
  font-size: 1.05rem;
  margin: 0 0.3rem;
  position: relative;
`;

const DropDownWrapper = styled.div`
  text-align: center;
  align-self: start;
  margin-left: 3rem;
`;

const DropDown = styled.ul`
  width: 6rem;
  border: 0.1rem solid ${theme.color.primary};
  border-radius: 0.5rem;
  padding: 0.3rem;
  background-color: ${theme.color.secondary};
  color: ${theme.color.primary};
  font-weight: bold;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

const DropDownItem = styled.div`
  width: 6rem;
  border: 0.1rem solid ${theme.color.primary};
  border-radius: 0.5rem;
  padding: 0.3rem;
  background-color: ${theme.color.secondary};
  color: ${theme.color.primary};
  font-weight: bold;

  position: absolute;
  left: 7.1%;
  top: 40%;
  z-index: 1;

  &:hover {
    cursor: pointer;
  }
`;
