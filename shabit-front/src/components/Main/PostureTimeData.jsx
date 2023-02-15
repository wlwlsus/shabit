import React, { useContext } from 'react';
import Chart from 'react-apexcharts';
import { ThemeContext } from 'styled-components';
export default function PostureTimeData({ total, time }) {
  const themeContext = useContext(ThemeContext);
  const options = {
    chart: {
      type: 'bar',
      barHeight: '100%',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      },
    },
    fill: {
      type: 'solid',
      colors: themeContext.color.primary,
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#fff'],
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff'],
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
      series={[
        {
          data: [time],
        },
      ]}
      height={90}
      style={{ fontSize: '0.7rem' }}
    />
  );
}
