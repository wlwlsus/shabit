import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

//출처 https://apexcharts.com/react-chart-demos/timeline-charts/multiple-series-group-rows/

const RangeBarDaily = () => {
  //그래프에 쓰이는 데이터를 스테이트로 선언합니다.
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

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
          const colors = [];
          const newOptions = {
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
            colors: colors,
            xaxis: {
              type: 'datetime',
            },
            legend: {
              position: 'right',
            },
            tooltip: {
              y: {
                formatter(value) {
                  return ' ';
                },
              },
            },
          };

          const newSeries = [];

          for (let element of resData.data) {
            newSeries.push({
              name: element.posture,
              data: [
                {
                  x: '자세',
                  y: [
                    new Date(element.startTime).getTime() -
                      //시차 조정(8시간 만큼 제외)
                      new Date(element.startTime).getTimezoneOffset() *
                        60 *
                        1000,
                    //시차 조정(8시간 만큼 제외)
                    new Date(element.endTime).getTime() -
                      new Date(element.startTime).getTimezoneOffset() *
                        60 *
                        1000,
                  ],
                },
              ],
            });
            if (element.posture === '바른') {
              colors.push('#0067a3');
            } else {
              colors.push('#F44336');
            }
          }
          setSeries(newSeries);
          setOptions(newOptions);
        });
    };
    fetchData();
  }, []);

  const type = 'rangeBar';

  return (
    <div>
      <Chart type={type} options={options} series={series} height={350} />
    </div>
  );
};

export default RangeBarDaily;
