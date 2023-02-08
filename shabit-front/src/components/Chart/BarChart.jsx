import React, { useContext, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ThemeContext } from 'styled-components';
import { fetchDaily } from '../../services/stat/get';

const BarChart = ({ user }) => {
  const [data, setData] = useState([]);
  const [colors, setColors] = useState([]);
  const themeContext = useContext(ThemeContext);
  // 자세에 따른 색상, 이름 지정
  const colorTable = [
    0,
    themeContext.color.blueColor,
    themeContext.color.greenColor,
    themeContext.color.redColor,
    themeContext.color.yellowColor,
  ];
  const nameTable = [0, '바른 자세', '거북목', '누운 자세', '비스듬한 자세'];

  useEffect(() => {
    fetchDaily(user.email).then((res) => {
      const jsonData = res;
      const newData = [];
      const colorList = [];

      for (let element of jsonData) {
        newData.push({
          name: nameTable[element.postureId],
          data: [
            {
              x: '시간',
              //  시차 조정 (8시간 만큼 제외)
              y: [
                new Date(element.startTime).getTime() -
                  new Date(element.startTime).getTimezoneOffset() * 60 * 1000,
                new Date(element.endTime).getTime() -
                  new Date(element.startTime).getTimezoneOffset() * 60 * 1000,
              ],
            },
          ],
        });
        colorList.push(colorTable[element.postureId]);
      }
      setData(newData);
      setColors(colorList);
    });
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
      x: {
        show: true,
        format: 'HH:mm',
        formatter: undefined,
      },
    },
    colors: colors,
  };

  return (
    <Chart
      type={'rangeBar'}
      options={options}
      series={data}
      height={90}
      width={900}
      style={{ fontSize: '0.7rem' }}
    />
  );
};

export default BarChart;
