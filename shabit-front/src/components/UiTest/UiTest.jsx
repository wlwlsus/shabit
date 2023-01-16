import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

//출처 https://apexcharts.com/react-chart-demos/timeline-charts/multiple-series-group-rows/

const UiTest = () => {
  //그래프에 쓰이는 데이터를 스테이트로 선언합니다.
  const [series, setSeries] = useState({});

  /**
   * 마운트가 될 때에 실행되는 함수입니다.
   * fetch로 데이터를 받습니다. (res.json().data로 받으며, 순회가능한 데이터입니다.)
   * 해당 데이터를 순회하며 새로운 배열을 만듭니다. (이때 '바른' 자세가 항상 첫번째에 오며, 바른 자세의 endTime은 최대값으로 갱신합니다.)
   * 만들어진 배열을 series로 만듭니다.
   **/
  useEffect(() => {
    const fetchData = () => {
      fetch('/testData/dailyData.json')
        .then((res) => res.json())
        .then((resData) => {
          console.log(resData.data);
          console.log('자세:', resData.data[1].posture);
          console.log('시작시간:', resData.data[1].startTime);
          console.log('끝시간:', resData.data[1].endTime);
          const newSeries = [];
          let currentTime = 0;
          for (let element of resData.data) {
            if (element.posture === '바른') {
              if (newSeries[0]?.name !== element.posture) {
                newSeries.unshift({
                  name: element.posture,
                  data: [
                    {
                      x: '자세',
                      y: [
                        new Date(element.startTime).getTime(),
                        new Date(element.endTime).getTime(),
                      ],
                    },
                  ],
                });
                currentTime = new Date(element.endTime).getTime();
              } else if (currentTime < new Date(element.endTime).getTime()) {
                newSeries[0].data[0].y[1] = new Date(element.endTime).getTime();
              } else if (currentTime > new Date(element.startTime).getTime()) {
                newSeries[0].data[0].y[0] = new Date(
                  element.startTime,
                ).getTime();
              }
            } else {
              newSeries.push({
                name: element.posture,
                data: [
                  {
                    x: '자세',
                    y: [
                      new Date(element.startTime).getTime(),
                      new Date(element.endTime).getTime(),
                    ],
                  },
                ],
              });
            }
            console.log(element, newSeries);
          }
          setSeries(newSeries);
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
    colors: [
      '#0067a3',
      '#F44336',
      '#F44336',
      '#F44336',
      '#F44336',
      '#F44336',
      '#F44336',
      '#F44336',
      '#F44336',
      '#F44336',
      '#F44336',
    ],
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
  // const series = [
  //   // George Washington
  //   {
  //     name: '바른자세',
  //     data: [
  //       {
  //         x: '자세',
  //         y: [
  //           new Date('2023-01-16 13:50:30').getTime(),
  //           new Date('2023-01-16 14:50:30').getTime(),
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     name: '구린자세',
  //     data: [
  //       {
  //         x: '자세',
  //         y: [
  //           new Date('2023-01-16 13:55:30').getTime(),
  //           new Date('2023-01-16 14:12:30').getTime(),
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     name: '거북목',
  //     data: [
  //       {
  //         x: '자세',
  //         y: [
  //           new Date('2023-01-16 14:30:30').getTime(),
  //           new Date('2023-01-16 14:36:30').getTime(),
  //         ],
  //       },
  //     ],
  //   },
  //   // // John Adams
  //   // {
  //   //   name: '거북목',
  //   //   data: [
  //   //     {
  //   //       x: 'President',
  //   //       y: [new Date(1797, 2, 4).getTime(), new Date(1801, 2, 4).getTime()],
  //   //     },
  //   //   ],
  //   // },
  //   // // Thomas Jefferson
  //   // {
  //   //   name: '오른쪽',
  //   //   data: [
  //   //     {
  //   //       x: 'President',
  //   //       y: [new Date(1809, 2, 4).getTime(), new Date(1815, 2, 4).getTime()],
  //   //     },
  //   //   ],
  //   // },
  //   // // Thomas Jefferson
  // ];

  return (
    <div>
      <Chart type={type} options={options} series={series} height={350} />
    </div>
  );
};

export default UiTest;
