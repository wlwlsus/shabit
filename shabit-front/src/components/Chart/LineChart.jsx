import React, { useEffect, useState } from 'react';
import { theme } from '../../styles/GlobalStyles';
import { loadEffect } from '../common/animation';
import styled from 'styled-components';
import ReactApexChart from 'react-apexcharts';
import DonutChart from './DonutChart';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';

const LineChart = ({ mode, lineData, page, setPage }) => {
  const [axisX, setAxisX] = useState([]);
  const [axisY, setAxisY] = useState([]);

  const changePage = (value) => {
    let newPage = page;
    if (value) {
      if (page === 0) return;
      newPage += 1;
    } else {
      newPage -= 1;
    }
    setPage(newPage);
  };

  //  도넛차트에 넘겨줄 날짜
  //  day 초기값 설정 : Lazy Initialization (state 정의될 때 한 번만 실행)
  const [day, setDay] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();

    month = month.toString().padStart(2, '0');
    date = date.toString().padStart(2, '0');

    return `${year}-${month}-${date}`; // yyyy-mm-dd
  });

  useEffect(() => {
    if (!lineData.length) return;

    // 날짜 중복 제거 & 오래된순 ~ 최신순 정렬
    let newData = new Set();
    for (let data of lineData) {
      newData.add(data.date);
    }
    newData = [...newData];
    const sortedData = newData.sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime();
    });

    setDay(sortedData[0]);
    setAxisX(sortedData);

    //  날짜 개수만큼의 0값을 가지는 배열 생성
    const totalTime = Array.from({ length: sortedData.length }, () => 0);
    const goodTime = [...totalTime];

    // 날짜별 바른자세 총합, 전체시간 총합(분) 구하기
    for (let data of lineData) {
      let index = sortedData.indexOf(data.date);
      if (data.postureId === 1) {
        goodTime[index] += data.time;
      }
      totalTime[index] += data.time;
    }

    //  날짜별 바른자세 데이터 나누기 날짜별 전체시간 데이터 (소수점 2째 자리 올림)
    const newSeriesData = goodTime.map((data, idx) => {
      if (!data) return 0;
      else return Math.ceil((data / totalTime[idx]) * 100);
    });

    setAxisY(newSeriesData);
  }, [lineData]);

  // stroke 클릭 => donut chart로 데이터 prop
  const onChartClick = (event, chartContext, config) => {
    const newDay = config.globals.categoryLabels[config.dataPointIndex];
    if (newDay) {
      setDay(newDay);
    }
  };

  const series = [
    {
      name: mode,
      data: axisY,
    },
  ];

  const options = {
    chart: {
      height: 300,
      type: 'line',
      zoom: {
        enabled: false,
      },
      events: {
        click: onChartClick,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
      curve: 'smooth',
      colors: theme.color.primary,
    },
    title: {
      text: '단위:퍼센트(%)',
      align: 'left',
    },
    grid: {
      row: {
        colors: [theme.color.whiteColor, 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      type: 'datetime',
      categories: axisX,
      labels: {
        format: 'yy.MM.dd',
      },
    },
    yaxis: {
      max: 100,
    },
  };

  return (
    <ChartWrapper>
      <div>
        <BsFillCaretLeftFill onClick={() => changePage(0)} />
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={255}
          width={450}
          style={{ fontSize: '0.6rem' }}
        />
        <BsFillCaretRightFill onClick={() => changePage(1)} />
      </div>
      <DonutWrapper>
        <Title>
          {day?.split('-')[0]}년 {day?.split('-')[1]}월 {day?.split('-')[2]}일
        </Title>
        <DonutChart jsonData={lineData} day={day} />
      </DonutWrapper>
    </ChartWrapper>
  );
};

export default LineChart;

const ChartWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;

  animation: 0.8s ease-in ${loadEffect.down};

  & > div:nth-child(1) {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border: 0.2rem solid ${theme.color.secondary};
    border-radius: 1.5rem;
    box-shadow: 0 0.2rem 0.5rem ${theme.color.lightGrayColor};

    &:hover {
      cursor: pointer;
    }

    & > svg {
      font-size: 1.5rem;
      color: ${theme.color.grayColor};

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const DonutWrapper = styled.div`
  margin-top: 1rem;
  width: 21rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-weight: bold;
  color: ${theme.color.blackColor};
`;
