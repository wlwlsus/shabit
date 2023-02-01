import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CalendarHeatmap from 'react-calendar-heatmap';
import { theme } from '../../styles/GlobalStyles';

const Heatmap = ({ heatMapSeries }) => {
  //  Heatmap Data
  // const [values, setValues] = useState(heatMapData);
  const values: Array = heatMapSeries;
  const [today] = useState(new Date());
  const [startDate, setStartDate] = useState();

  //  기간 설정 (1년 전 ~ today)
  // Lazy Initialization (state 정의될 때 한 번만 실행)
  const [endDate] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    month = month.toString().padStart(2, '0');
    day = day.toString().padStart(2, '0');

    setStartDate(`${year - 1}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  });

  //  마운트 됐을 때 데이터 가져옴
  //  배열에 날짜, 퍼센트, 클래스(색) 저장
  // useEffect(() => {
  //   fetch(`/testData/heatMapData.json`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       const jsonData = res.result;
  //       const newArray = [];
  //       for (let element of jsonData) {
  //         const { date, percentage } = element;
  //         let classValue = 0;
  //         if (percentage >= 80) classValue = 4;
  //         else if (percentage >= 60) classValue = 3;
  //         else if (percentage >= 40) classValue = 2;
  //         else if (percentage >= 20) classValue = 1;
  //         newArray.push({ date, percentage, classValue });
  //       }
  //       setValues(newArray);
  //     });
  // }, []);

  return (
    <HeatmapContainer style={{ width: 1000 }}>
      <CalendarHeatmap
        endDate={endDate}
        startDate={startDate}
        values={values}
        showWeekdayLabels={true}
        //classForValue로 색깔이 될 클래스를 지정합니다.
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${value.classValue}`;
        }}
      />
    </HeatmapContainer>
  );
};

export default Heatmap;

const HeatmapContainer = styled.div`
  /*
 * https://ourcodeworld.com/articles/read/563/creating-a-calendar-heatmap-chart-github-contributions-like-in-reactjs
 * react-calendar-heatmap styles
 *
 * All of the styles in this file are optional and configurable!
 * The github and gitlab color scales are provided for reference.
 */

  .react-calendar-heatmap text {
    font-size: 0.5rem;
    fill: #aaa;
  }

  .react-calendar-heatmap rect:hover {
    stroke: #555;
    stroke-width: 1px;
    cursor: pointer;
  }

  /*
 * Default color scale
 */

  .react-calendar-heatmap .color-empty {
    fill: #eeeeee;
  }

  .react-calendar-heatmap .color-filled {
    fill: #8cc665;
  }

  /*
 * Github color scale
 */

  .react-calendar-heatmap .color-github-0 {
    fill: #eeeeee;
  }
  .react-calendar-heatmap .color-github-1 {
    fill: #d6e685;
  }
  .react-calendar-heatmap .color-github-2 {
    fill: #8cc665;
  }
  .react-calendar-heatmap .color-github-3 {
    fill: #44a340;
  }
  .react-calendar-heatmap .color-github-4 {
    fill: #1e6823;
  }

  /*
 * Gitlab color scale
 */

  .react-calendar-heatmap .color-gitlab-0 {
    fill: #ededed;
  }
  .react-calendar-heatmap .color-gitlab-1 {
    fill: #acd5f2;
  }
  .react-calendar-heatmap .color-gitlab-2 {
    fill: #7fa8d1;
  }
  .react-calendar-heatmap .color-gitlab-3 {
    fill: #49729b;
  }
  .react-calendar-heatmap .color-gitlab-4 {
    fill: #254e77;
  }

  /* 색깔은 여기에서 바꾸세여 */
  .react-calendar-heatmap .color-scale-0 {
    fill: ${theme.heatMap.scale0};
  }

  .react-calendar-heatmap .color-scale-1 {
    fill: ${theme.heatMap.scale1};
  }
  .react-calendar-heatmap .color-scale-2 {
    fill: ${theme.heatMap.scale2};
  }
  .react-calendar-heatmap .color-scale-3 {
    fill: ${theme.heatMap.scale3};
  }
  .react-calendar-heatmap .color-scale-4 {
    fill: ${theme.heatMap.scale4};
  }
`;
