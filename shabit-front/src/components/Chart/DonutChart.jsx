import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';

const DonutChart = ({ jsonData, day }) => {
  const [data, setData] = useState([]); // 전체 데이터

  // 자세 정보와 Label을 잇는 테이블
  // 순서 맞춤 필수 : 같은 자세, 같은 color
  const labels = ['바른 자세', '거북목', '누운 자세', '비스듬한 자세'];

  useEffect(() => {
    // 오늘 날짜 데이터 필터링
    const dailyData = jsonData.filter((e) => e.date === day);

    //  차트 데이터 배열 0으로 초기화 (자세 4종류)
    const newData = [0, 0, 0, 0];

    //  자세 정보에 따른 데이터 분류
    for (let data of dailyData) {
      newData[data.postureId - 1] += data.time;
    }

    setData(newData);
  }, [jsonData, day]); // props는 dependency에 없으면 업데이트가 안됨

  const options = {
    chart: {
      width: 380,
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      position: 'bottom',
      offsetY: 0,
      height: 40,
    },
  };

  if (!data.reduce((acc, crr) => acc + crr, 0)) {
    return (
      <EmptyDonut>
        기록이 없습니다 <br /> 다른 날짜를 선택해주세요
      </EmptyDonut>
    );
  } else {
    return (
      <ReactApexChart
        options={options}
        series={data}
        type="donut"
        width={350}
        height={290}
      />
    );
  }
};

export default DonutChart;

const EmptyDonut = styled.div`
  background-color: ${(props) => props.theme.color.secondary};
  width: 13rem;
  height: 13rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 1rem;
  color: ${(props) => props.theme.color.primary};
  font-weight: bold;
  line-height: 1.8rem;
`;
