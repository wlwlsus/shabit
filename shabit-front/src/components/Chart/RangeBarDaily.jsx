import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { theme } from '../../styles/GlobalStyles';

const RangeBarDaily = () => {
  const [series, setSeries] = useState([]); // 차트 데이터
  const [colors, setColors] = useState([]); // 차트 옵션 데이터

  // 자세에 따라 색상 지정
  const checkPosture = (posture) => {
    let color = '';
    switch (posture) {
      case '바른':
        color = theme.color.blueColor;
        break;
      case '거북목':
        color = theme.color.greenColor;
        break;
      case '누운':
        color = theme.color.yellowColor;
        break;
      case '비스듬':
        color = theme.color.redColor;
        break;
      default:
        color = theme.color.blueColor;
    }
    return color;
  };

  // 마운트될 때 실행
  useEffect(() => {
    const fetchData = () => {
      fetch('/testData/dailyData.json')
        .then((res) => res.json())
        .then((resData) => {
          setColors([
            theme.color.redColor,
            theme.color.greenColor,
            theme.color.blueColor,
            theme.color.yellowColor,
          ]);

          const newSeries = [];
          const colorList = [];
          for (let element of resData.data) {
            newSeries.push({
              name: element.posture,
              data: [
                {
                  x: '자세',
                  //  시차 조정 (8시간 만큼 제외)
                  y: [
                    new Date(element.startTime).getTime() -
                      new Date(element.startTime).getTimezoneOffset() *
                        60 *
                        1000,

                    new Date(element.endTime).getTime() -
                      new Date(element.startTime).getTimezoneOffset() *
                        60 *
                        1000,
                  ],
                },
              ],
            });
            // 자세에 따라 색상 지정
            colorList.push(checkPosture(element.posture));
          }
          setSeries(newSeries);
          setColors(colorList);
        });
    };
    fetchData();
  }, []);

  const options = {
    chart: {
      type: 'rangeBar',
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '100%',
        rangeBarGroupRows: true,
      },
    },
    fill: {
      type: 'solid',
      colors: colors,
    },
    xaxis: {
      type: 'datetime',
    },
    legend: {
      show: false,
    },
    tooltip: {
      y: {
        formatter(value) {
          return '';
        },
      },
    },
    colors: colors,
  };

  return (
    <Chart
      type={'rangeBar'}
      options={options}
      series={series}
      height={90}
      width={900}
      style={{ fontSize: '0.7rem' }}
    />
  );
};

export default RangeBarDaily;
