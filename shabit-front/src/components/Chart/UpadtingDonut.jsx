import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';

const UpadtingDonut = ({ jsonData, day }) => {
  // Props.day : 오늘 날짜
  const [series, setSeries] = useState([]); // 전체 데이터

  // 자세 정보와 Label을 잇는 테이블
  // 순서 맞춤 필수 : 같은 자세, 같은 color
  const indexTable = ['바른', '거북목', '누운', '비스듬'];
  const labels = ['바른 자세', '거북목', '누운 자세', '비스듬한 자세'];

  useEffect(() => {
    // 오늘 날짜 데이터 필터링
    const dailyData = jsonData.filter((e) => e.date === day);

    //  차트 데이터 배열 0으로 초기화 (자세 4종류)
    const newSeries = [0, 0, 0, 0];

    //  자세 정보에 따른 데이터 분류
    for (let element of dailyData) {
      newSeries[indexTable.indexOf(element.posture)] += element.time;
    }

    setSeries(newSeries);
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

  return (
    <>
      {!series.reduce((acc, crr) => acc + crr, 0) ? (
        <Msg>
          {day.split('-')[0]}년 {day.split('-')[1]}월 {day.split('-')[2]}일의
          기록이 없습니다
        </Msg>
      ) : (
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          width={350}
          height={290}
        />
      )}
    </>
  );
};

export default UpadtingDonut;

const Msg = styled.div`
  font-size: 0.8rem;
`;
