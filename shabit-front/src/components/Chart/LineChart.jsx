import React, { useEffect, useState } from 'react';
import { theme } from '../../styles/GlobalStyles';
import styled from 'styled-components';
import ReactApexChart from 'react-apexcharts';
import UpadtingDonut from './UpadtingDonut';

const LineChart = ({ mode }) => {
  const [jsonData, setJsonData] = useState([]); //  전체 데이터
  const [categories, setCategories] = useState([]); //  x축 데이터
  const [seriesData, setSeriesData] = useState([]); //  그래프 데이터

  //  파이차트에 넘겨줄 날짜
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

  //  마운트 됐을 때 데이터 가져옴
  useEffect(() => {
    fetch(`/testData/${mode}Data.json`)
      .then((res) => res.json())
      .then((res) => {
        setJsonData(res.data);
      });
  }, [mode]);

  //  json데이터 업데이트마다 실행
  useEffect(() => {
    console.log(jsonData);
    if (jsonData.length) {
      const sortedData = jsonData
        // '바른'자세 데이터 오래된순 ~ 최신순 정렬
        .filter((data) => data.posture === '바른')
        .sort((a, b) => {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
          return aDate - bDate;
        });

      //  x축 : 날짜
      const newCategories = sortedData.map((e) => e.date);

      //  날짜 개수만큼의 원소를 가지는 배열 생성 (0으로 초기화)
      const totalTime = Array.from({ length: newCategories.length }, () => 0);

      // json데이터 전체 순회, 날짜별 자세 총합(분) 구하기
      for (let element of jsonData) {
        let index = newCategories.indexOf(element.date);
        totalTime[index] += element.time;
      }

      //  날짜별 '바른' 자세 데이터 나누기 날짜별 '전체 시간' 데이터 (소수점 2째 자리 내림)
      const newSeriesData = sortedData.map((e, idx) => {
        return Math.ceil((e.time / totalTime[idx]) * 100) / 100;
      });

      setCategories(newCategories); // X축 데이터
      setSeriesData(newSeriesData); // 그래프 데이터
    }
  }, [jsonData]);

  // stroke 클릭 => donut chart로 데이터 보냄
  const onChartClick = (event, chartContext, config) => {
    const newDay = config.globals.categoryLabels[config.dataPointIndex];
    if (newDay) {
      setDay(newDay);
    }
  };

  const series = [
    {
      name: mode,
      data: seriesData,
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
      categories: categories,
      labels: {
        style: {
          colors: theme.color.blackColor,
        },
      },
    },
  };

  return (
    <ChartWrapper>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={270}
          width={450}
          style={{ fontSize: '0.6rem' }}
        />
      </div>
      <DonutWrapper>
        <Title>
          {day?.split('-')[0]}년 {day?.split('-')[1]}월 {day?.split('-')[2]}일
        </Title>
        <UpadtingDonut jsonData={jsonData} day={day}></UpadtingDonut>
      </DonutWrapper>
    </ChartWrapper>
  );
};

export default LineChart;

const ChartWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const DonutWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  color: ${theme.color.blackColor};
`;
