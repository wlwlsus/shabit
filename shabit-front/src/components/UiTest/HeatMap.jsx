import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CalendarHeatmap from 'react-calendar-heatmap';

const HeatMap = () => {
  // Import the calendarheatmap
  const [values, setValues] = useState([]);
  const [endDate, setEndDate] = useState(() => {
    const now = new Date();
    const today = now
      .toLocaleDateString()
      .split(' ')
      .map((e) => {
        return e.replace('.', '').padStart(2, '0');
      })
      .join('-');
    return today;
  });
  // const startDate = () => {
  //   const dateArr = endDate.split('-');
  //   dateArr[0] = (~~dateArr[0] - 1).toString();
  //   console.log(dateArr);
  //   return dateArr.join('-');
  // };

  useEffect(() => {
    fetch(`/testData/heatMapData.json`)
      .then((res) => res.json())
      .then((res) => {
        const jsonData = res.result;
        const newArray = [];
        for (let element of jsonData) {
          const { date, percentage } = element;
          let classValue = 0;
          if (percentage >= 80) classValue = 4;
          else if (percentage >= 60) classValue = 3;
          else if (percentage >= 40) classValue = 2;
          else if (percentage >= 20) classValue = 1;
          newArray.push({ date, percentage, classValue });
        }
        setValues(newArray);
      });
  }, []);

  // const values = [
  //   { date: '2023-01-18', count: 4 },
  //   { date: '2023-01-15', count: 1 },
  //   { date: '2023-01-10', count: 3 },
  // { date: new Date(2016, 0, 4) },
  // ];
  // How many days should be shown
  // const numDays = 365;

  const onClick = (e) => console.log(e);

  return (
    <StyledContainer style={{ width: 700 }}>
      <CalendarHeatmap
        endDate={endDate}
        // startDate={startDate}
        // numDays={numDays}
        values={values}
        onClick={onClick}
        showWeekdayLabels={true}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-gitlab-${value.classValue}`;
        }}
      />
    </StyledContainer>
  );
};

export default HeatMap;

const StyledContainer = styled.div`
  /*
 * https://ourcodeworld.com/articles/read/563/creating-a-calendar-heatmap-chart-github-contributions-like-in-reactjs
 * react-calendar-heatmap styles
 *
 * All of the styles in this file are optional and configurable!
 * The github and gitlab color scales are provided for reference.
 */

  .react-calendar-heatmap text {
    font-size: 10px;
    fill: #aaa;
  }

  .react-calendar-heatmap rect:hover {
    stroke: #555;
    stroke-width: 1px;
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
  .react-calendar-heatmap .color-scale-1 {
    fill: #d6e685;
  }
  .react-calendar-heatmap .color-scale-2 {
    fill: #8cc665;
  }
  .react-calendar-heatmap .color-scale-3 {
    fill: #44a340;
  }
  .react-calendar-heatmap .color-scale-4 {
    fill: #1e6823;
  }
`;
