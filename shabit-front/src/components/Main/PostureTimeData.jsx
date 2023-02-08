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

export default function PostureTimeData({ total, time }) {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [theme, setTheme] = useState(pinkTheme);
  const themeList = [pinkTheme, darkTheme, blueTheme, greenTheme];

  useEffect(() => {
    const themeInfo = localStorage.getItem('theme');
    if (!themeInfo) return;
    setTheme(themeList[themeInfo]);
  }, []);

  const options = {
    chart: {
      type: 'bar',
      barHeight: '100%',
      zoom: {
        enabled: false,
      },
      toolbar:{
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      }
    },
    fill: {
      type: 'solid',
      colors: theme.color.primary,
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#fff']
      }
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff']
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    yaxis: {
      max: total,
      labels: {
        show: false,
      },
    },
    xaxis: {
      categories: ['자세'],
    },
  };

  return (
    <Chart
      type={'bar'}
      options={options}
      series={[{
        data: [time]
      }]}
      height={90}
      style={{ fontSize: '0.7rem' }}
    />
  );
}
