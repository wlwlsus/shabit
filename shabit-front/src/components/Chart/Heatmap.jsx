import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CalendarHeatmap from 'react-calendar-heatmap';
import { theme } from '../../styles/GlobalStyles';

import { fetchHeatmap } from '../../services/stat/get';

const Heatmap = ({ user }) => {
  const [HeatmapData, setHeatmapData] = useState([]);
  const [startDate, setStartDate] = useState('');

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

  useEffect(() => {
    fetchHeatmap(user.email).then((res) => {
      setHeatmapData(res);
    });
  }, []);

  return (
    <HeatmapContainer style={{ width: 1000 }}>
      <CalendarHeatmap
        endDate={endDate}
        startDate={startDate}
        values={HeatmapData}
        showWeekdayLabels={true}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${value.classValue}`; //  색 적용할 클래스 지정
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
