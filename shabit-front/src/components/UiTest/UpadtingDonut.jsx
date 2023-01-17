import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const UpadtingDonut = ({ jsonData, day }) => {
  // const series = [44, 55, 13, 33];

  // 그래프에 들어갈 차트입니다.
  const [series, setSeries] = useState([]);

  // 데이터에 있는 자세의 정보와 lebels를 잇는 테이블입니다. 순서를 맞춰주세요.
  const indexTable = ['바른', '거북목', '누운', '왼팔', '오른팔'];

  //labels 데이터입니다.
  const labels = ['바른자세', '거북목', '누운 자세', '왼팔 굄', '오른팔 굄'];

  useEffect(() => {
    //json 파일 데이터에서 오늘 날짜의 데어터를 필터링합니다.
    const dailyData = jsonData.filter((e) => e.date === day);

    //차트에 들어갈 배열을 0으로 초기화합니다.
    const newSeries = Array.from({ length: labels.length }, () => 0);

    //오늘 데이터의 자세 정보와 인덱스 테이블의 자세 정보를 조회하여 차트에 들어갈 배열에 더해줍니다.
    for (let element of dailyData) {
      newSeries[indexTable.indexOf(element.posture)] =
        newSeries[indexTable.indexOf(element.posture)] + element.time;
    }

    //만들어진 데이터를 넣어줍니다.
    setSeries(newSeries);
  }, [jsonData, day]);
  // }, []); //프롭스가 의존자 배열에 없으면 업데이트가 안되요 ㅠㅠㅠㅠ

  const options = {
    chart: {
      width: 380,
      type: 'donut',
    },
    dataLabels: {
      //라벨 가운데로 보내기
      //https://stackoverflow.com/questions/73834342/how-to-customize-label-unit-on-apexchart-radialbar?rq=1
      enabled: false,
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],

    legend: {
      position: 'right',
      offsetY: 0,
      height: 230,
    },
  };

  return (
    <>
      <div className="chart-wrap">
        <div>
          {!series.reduce((acc, crr) => acc + crr, 0) ? (
            day + '의 데이터가 없습니다.'
          ) : (
            <div id="chart">
              <ReactApexChart
                options={options}
                series={series}
                type="donut"
                width={380}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UpadtingDonut;
