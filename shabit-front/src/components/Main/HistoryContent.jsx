import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import { loadEffect } from '../common/animation';
import BarChart from '../Chart/BarChart';
import LineChart from '../Chart/LineChart';
import { fetchWeekly, fetchMonthly } from '../../services/stat/get';
// import { typedUseSelector } from '../../store';

export default function HistoryContent() {
  const [lineData, setLineData] = useState([]);
  const [mode, setMode] = useState('w');
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
    if (mode === 'w') {
      fetchWeekly(user.email, page).then((res) => {
        setLineData(res);
      });
    } else {
      fetchMonthly(user.email, page).then((res) => {
        setLineData(res);
      });
    }
  }, [user.email, mode, page]);

  const handleMode = (e) => {
    const newMode = e.target.id;
    setMode(newMode);
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

      <ToolBar>
        <RadioWrapper>
          <label htmlFor="w">
            <Checkbox name="mode" id="w" defaultChecked onChange={handleMode} />
            Weekly
          </label>
          <label htmlFor="m">
            <Checkbox name="mode" id="m" onChange={handleMode} />
            Monthly
          </label>
        </RadioWrapper>
        <Reset
          onClick={() => {
            setPage(0);
          }}
        >
          Reset
        </Reset>
      </ToolBar>
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

const ToolBar = styled.div`
  width: 47%;
  display: flex;
  align-self: start;
  justify-content: space-between;
  margin-left: 4.5rem;
`;

const RadioWrapper = styled.div`
  width: 45%;
  display: flex;
  justify-content: space-evenly;
  color: ${theme.color.primary};
  font-weight: bold;

  & > label {
    &:hover {
      cursor: pointer;
    }
  }
`;

const Reset = styled.div`
  color: ${theme.color.primary};
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

const Checkbox = styled.input.attrs({ type: 'radio' })`
  margin-right: 0.5rem;
  appearance: none;
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 100%;
  background-color: ${theme.color.secondary};

  &:checked {
    background-color: ${theme.color.primary};
  }
`;
