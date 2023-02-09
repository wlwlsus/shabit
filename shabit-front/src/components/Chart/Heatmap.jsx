import React, { useState } from 'react';
import styled from 'styled-components';
import CalendarHeatmap from 'react-calendar-heatmap';
import { typedUseSelector } from '../../store';

const Heatmap = () => {
  const [startDate, setStartDate] = useState('');
  const heatmapData = typedUseSelector((state) => {
    return state.chart.heatmapData;
  });

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

  return (
    <HeatmapContainer style={{ width: 1000 }}>
      <CalendarHeatmap
        endDate={endDate}
        startDate={startDate}
        values={heatmapData}
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

  .react-calendar-heatmap .color-scale-0 {
    fill: ${(props) => props.theme.heatMap.scale0};
  }

  .react-calendar-heatmap .color-scale-1 {
    fill: ${(props) => props.theme.heatMap.scale1};
  }
  .react-calendar-heatmap .color-scale-2 {
    fill: ${(props) => props.theme.heatMap.scale2};
  }
  .react-calendar-heatmap .color-scale-3 {
    fill: ${(props) => props.theme.heatMap.scale3};
  }
  .react-calendar-heatmap .color-scale-4 {
    fill: ${(props) => props.theme.heatMap.scale4};
  }
`;
