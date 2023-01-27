import React, { useEffect, useMemo, useState } from 'react';
import { theme } from '../../styles/GlobalStyles';
import ReactApexChart from 'react-apexcharts';
import UpadtingDonut from './UpadtingDonut';

const LineChart = () => {
  const [mode, setMode] = useState('weeklyData'); //  가져올 파일명
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
    fetch(`/testData/${mode}.json`)
      .then((res) => res.json())
      .then((res) => {
        setJsonData(res.data);
      });
  }, []);

  //  데이터 업데이트마다 실행
  useEffect(() => {
    if (jsonData.length) {
      const sortedData = jsonData
        // '바른'자세 데이터 오래된순 ~ 최신순 정렬
        .filter((data) => data.posture === '바른')
        .sort((a, b) => {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
          return aDate - bDate;
        });

      //  x축 = 날짜
      const newCategories = sortedData.map((e) => e.date);
      //  날짜의 갯수만큼 합계를 구할 배열을 0으로 초기화 합니다.
      //
      const totalTime = Array.from({ length: newCategories.length }, () => 0);

      //json 데이터 전체를 순회하며, 일치하는 날짜의 합을 구해 날짜별로 배열에 더합니다.
      for (let element of jsonData) {
        let index = newCategories.indexOf(element.date);
        totalTime[index] = totalTime[index] + element.time;
      }

      //날짜별로 구한 '바른 자세' 데이터를 날짜별 '전체 시간'의 데이터로 나누어 소숫점 2째 자리에서 내림하여 그래프의 데이터로 반환합니다.
      const newSeriesData = sortedData.map((e, idx) => {
        return Math.ceil((e.time / totalTime[idx]) * 100) / 100;
      });
      setCategories(newCategories);
      setSeriesData(newSeriesData);
    }
  }, [jsonData]);

  // ############################################################################# //

  const onModeToggle = () => {
    setMode(mode === 'weeklyData' ? 'monthlyData' : 'weeklyData');
  };

  // 라벨이 클릭되면 발생할 이벤트 입니다.
  const onChartClick = (event, chartContext, config) => {
    setDay(config.globals.categoryLabels[config.dataPointIndex]);
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
        colors: [theme.color.whiteColor, 'transparent'], // takes an array which will be repeated on columns
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
    <>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
          width={500}
        />
      </div>
      <div>{day}</div>
      <UpadtingDonut jsonData={jsonData} day={day}></UpadtingDonut>
    </>
  );
};

export default LineChart;
