import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

//출처 https://apexcharts.com/react-chart-demos/timeline-charts/multiple-series-group-rows/

const UiTest = () => {
  useEffect(() => {
    const fetchData = () => {
      fetch('/testData/dailyData.json')
        .then((res) => res.json())
        .then((resData) => {
          console.log(resData.data);
          console.log('자세:', resData.data[1].posture);
          console.log('시작시간:', resData.data[1].startTime);
          console.log('끝시간:', resData.data[1].endTime);
        });
    };
    fetchData();
  }, []);

  const type = 'rangeBar';
  const options = {
    chart: {
      height: 350,
      type: 'rangeBar',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '50%',
        rangeBarGroupRows: true,
      },
    },
    fill: {
      type: 'solid',
    },
    colors: ['#0067a3', '#F44336', '#F44336', '#F44336', '#F44336'],
    xaxis: {
      type: 'datetime',
    },
    legend: {
      position: 'right',
    },
    tooltip: {
      y: {
        formatter(value) {
          // console.log(value.split(' ')[2]);
          return ' ';
        },
      },
      // custom: function (opts) {
      //   // const fromYear = '1600';
      //   const formYear = new Date(opts.y1).getHours();
      //   // new Date(opts.y1).getMonth().toString().padStart(2, '0') +
      //   // new Date(opts.y1).getDate().toString().padStart(2, '0');
      //   const toYear = new Date(opts.y2).getHours();
      //   // const toYear = '2000';
      //   // new Date(opts.y2).getMonth().toString().padStart(2, '0') +
      //   // new Date(opts.y2).getDate().toString().padStart(2, '0');
      // const values = opts.ctx.rangeBar.getTooltipValues(opts);
      // y: {
      //   formatter(value, series) {
      //     return series[0].data[0].y[0];
      //   },
      // },
      // return '';
      // },
    },
  };
  const series = [
    // George Washington
    {
      name: '바른자세',
      data: [
        {
          x: '자세',
          y: [
            new Date('2023-01-16 13:50:30').getTime(),
            new Date('2023-01-16 14:50:30').getTime(),
          ],
        },
      ],
    },
    {
      name: '구린자세',
      data: [
        {
          x: '자세',
          y: [
            new Date('2023-01-16 13:55:30').getTime(),
            new Date('2023-01-16 14:12:30').getTime(),
          ],
        },
      ],
    },
    {
      name: '거북목',
      data: [
        {
          x: '자세',
          y: [
            new Date('2023-01-16 14:30:30').getTime(),
            new Date('2023-01-16 14:36:30').getTime(),
          ],
        },
      ],
    },
    // // John Adams
    // {
    //   name: '거북목',
    //   data: [
    //     {
    //       x: 'President',
    //       y: [new Date(1797, 2, 4).getTime(), new Date(1801, 2, 4).getTime()],
    //     },
    //   ],
    // },
    // // Thomas Jefferson
    // {
    //   name: '오른쪽',
    //   data: [
    //     {
    //       x: 'President',
    //       y: [new Date(1809, 2, 4).getTime(), new Date(1815, 2, 4).getTime()],
    //     },
    //   ],
    // },
    // // Thomas Jefferson
  ];

  return (
    <div>
      <Chart type={type} options={options} series={series} height={350} />
    </div>
  );
};

export default UiTest;
