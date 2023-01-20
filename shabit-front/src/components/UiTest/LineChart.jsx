import React, { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Services from '../../services';
import UpadtingDonut from './UpadtingDonut';

const LineChart = () => {
  const [mode, setMode] = useState('weeklyData'); //가져올 파일명
  const [jsonData, setJsonData] = useState([]); //전체 json 데이터

  const [categories, setCategories] = useState([]); //x축의 라벨 데이터
  const [seriesData, setSeriesData] = useState([]); //그래프 데이터

  // const today = useMemo(() => {
  //   const now = new Date();
  //   const newDay = now
  //     .toLocaleDateString()
  //     .split(' ')
  //     .map((e) => {
  //       return e.replace('.', '').padStart(2, '0');
  //     })
  //     .join('-');
  //   return newDay;
  // }, []);

  //파이차트에 prop으로 넘겨줄 날짜입니다.
  //lazyInitial함수를 통해 오늘 날짜를 "yyyy-mm-dd" 포맷으로 구한 후, day의 초기값으로 설정합니다.
  const [day, setDay] = useState(() => {
    const now = new Date();
    const today = now
      .toLocaleDateString()
      .split(' ')
      .map((e) => {
        return e.replace('.', '').padStart(2, '0');
      })
      .join('-');
    return today;
  });

  //마운트되면 json데이터를 가져옵니다.
  useEffect(() => {
    fetch(`/testData/${mode}.json`)
      .then((res) => res.json())
      .then((res) => {
        setJsonData(res.data);
      });
  }, []);

  // 서버 연결되면 json파일 대신 아래 구문으로 불러오기.
  // useEffect(() => {
  //   if (mode === 'weeklyData') {
  //     Services.Stat.fetchWeekly(
  //       JSON.parse(localStorage.getItem('user')).email,
  //     ).then((res) => {
  //       setValues(res);
  //     });
  //   } else if (mode === 'monthlyData') {
  //     Services.Stat.fetchMonthly(
  //       JSON.parse(localStorage.getItem('user')).email,
  //     ).then((res) => {
  //       setValues(res);
  //     });
  //   }
  // }, [mode]);

  //json데이터가 업데이트 될 때마다 실행됩니다.
  useEffect(() => {
    //jsonData가 존재하면
    if (!!jsonData.length) {
      //'바른' 자세에 대한 데이터를 날짜의 오름차순으로 정렬합니다.
      const newData = jsonData
        .filter((element) => element.posture === '바른')
        .sort((a, b) => {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
          return aDate - bDate;
        });

      //오름차순 정렬한 날짜 데이터를 x축의 데이터로 설정합니다.
      const newCategories = newData.map((e) => e.date);

      //날짜의 갯수만큼 합계를 구할 배열을 0으로 초기화 합니다.
      const totalTime = Array.from({ length: newCategories.length }, () => 0);

      //json 데이터 전체를 순회하며, 일치하는 날짜의 합을 구해 날짜별로 배열에 더합니다.
      for (let element of jsonData) {
        let index = newCategories.indexOf(element.date);
        totalTime[index] = totalTime[index] + element.time;
      }

      //날짜별로 구한 '바른 자세' 데이터를 날짜별 '전체 시간'의 데이터로 나누어 소숫점 2째 자리에서 내림하여 그래프의 데이터로 반환합니다.
      const newSeriesData = newData.map((e, idx) => {
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
      height: 350,
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
      curve: 'straight',
    },
    title: {
      text: '단위는 퍼센트라네',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },

    xaxis: {
      categories: categories,
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
        />
      </div>
      <div>{day}</div>
      <UpadtingDonut jsonData={jsonData} day={day}></UpadtingDonut>
    </>
  );
};

export default LineChart;
