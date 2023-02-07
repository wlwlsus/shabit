import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { loadEffect } from '../common/animation';
import {
  GlobalStyle,
  pinkTheme,
  blueTheme,
  darkTheme,
  greenTheme,
} from '../../styles/GlobalStyles';

import Chart from 'react-apexcharts';
import ThemeBox from './ThemeBox';
import Logo from '../common/Logo';

export default function PostureTimeData({ total, data }) {
  const [theme, setTheme] = useState(pinkTheme);
  const themeList = [pinkTheme, darkTheme, blueTheme, greenTheme];

  useEffect(() => {
    const themeInfo = localStorage.getItem('theme');
    if (!themeInfo) return;
    setTheme(themeList[themeInfo]);
  }, []);

  
  const [data2, setData] = useState([]);

  useEffect(() => {
      const newData = [];

      newData.push({
        data: [
          {
            x: '자세',
            y: [
              0, data
            ],
          },
        ],
      });
      setData(newData);
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
      colors: theme.color.primary,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false
    },
    x: {
      show: false,
    },
    yaxis: {
      max: total,
      labels: {
        show: false
      }
    },
    states: {
      hover: {
          filter: {
              type: 'none',
          }
      },
    },
    chart:{
      toolbar:{
        show: false
      }
    },
    colors: theme.color.primary,
  };

  return (
    <Chart
      type={'rangeBar'}
      options={options}
      series={data2}
      height={90}
      style={{ fontSize: '0.7rem' }}
    />
  );
}