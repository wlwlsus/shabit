// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';

// const UpdateDonutWeekly = () => {
//   /*
//       로직 짜기 :
//         1. 날짜를 입력 받는다. (onClick으로)
//         2. 입력받은 날짜의 데이터를 filter한다.
//         3. filter된 결과값에 대하여, reducer에 넣어 객체 형태로 반환한다.
//         4. 결과적으로 {2023-01-14 : {"누운": 6, "왼팔": 3, "바른": 5, "오른팔": 10, "거북목": 7, 전체: 26} } 의 객체가 나온다.
//         (해당 객체를 정렬할 것인지? 정렬할 것이라면 [키, 값] 형태의 배열의 배열로 할 것.)
//         ---------
//         데일리 데이터를 받아 처리할 것이기 때문에, 키 값 쌍의 객체가 아닌 변수를 선언하는 것이 어떨까?
//         각각 5개의 스테이트 만으로 처리가 가능하다.
//     */

//   // const [data, setData] = useState([]);
//   // const [dailyData, setDailyData] = useState({});

//   // const today = useMemo(() => {
//   //   const now = new Date();
//   //   const newDay = now
//   //     .toLocaleDateString()
//   //     .split(' ')
//   //     .map((e) => {
//   //       return e.replace('.', '').padStart(2, '0');
//   //     })
//   //     .join('-');
//   //   return newDay;
//   // }, []);

//   // const filterDailyData = (target) => {
//   //   setDailyData(data.map((e) => e.date === target));
//   //   console.log(data);
//   // };

//   //   (useCallback(
//   //     (target) => {
//   //       const filteredData = data.filter((e) => {
//   //         return e.date === target;
//   //       });
//   //       setDailyData(filteredData);
//   //       console.log(filteredData);
//   //     },
//   //     [data],
//   //   );
//   // )
//   // useEffect(() => {
//   //   fetch('/testData/weeklyData.json')
//   //     .then((res) => res.json())
//   //     .then((res) => {
//   //       setData(res.data);
//   //     })
//   //     .then(() => {
//   //       console.log(today);
//   //       console.log(data);
//   //       filterDailyData(today);
//   //     })
//   //     .then(() => {
//   //       console.log(dailyData);
//   //     });
//   // }, [data, today, dailyData]);

//   // const [day, setDay] = useState('');
//   // const [jsonData, setJsonData] = useState({});

//   // const fetchData = useCallback((day) => {
//   //   console.log(day);
//   //   fetch('/testData/weeklyData.json')
//   //     .then((res) => res.json())
//   //     .then((resData) => {
//   //       const data = resData.data.filter((e) => {
//   //         return e.date === day;
//   //       });
//   //       console.log(data);
//   //       setJsonData(data);
//   //     })
//   //     .then(() => {
//   //       console.log(jsonData);
//   //     });
//   // }, []);

//   // const getToday = () => {
//   //   const today = new Date();
//   //   const newDay = today
//   //     .toLocaleDateString()
//   //     .split(' ')
//   //     .map((e) => {
//   //       return e.replace('.', '').padStart(2, '0');
//   //     })
//   //     .join('-');
//   //   return newDay;
//   // };

//   // useEffect(() => {
//   //   const newDay = getToday();
//   //   setDay(newDay);
//   //   fetchData(newDay);
//   // }, []);

//   // const [straight, setStraight] = useState(0);
//   // const [forward, setFoward] = useState(0);
//   // const [left, setLeft] = useState(0);
//   // const [right, setRight] = useState(0);
//   // const [behind, setBehind] = useState(0);

//   const series = [44, 55, 13, 33];
//   const options = {
//     chart: {
//       width: 380,
//       type: 'donut',
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     colors: ['#FFFF00', '#FF0000', '#0000FF', '#00FF00', '#800000', '#808000'],
//     labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
//     responsive: [
//       {
//         breakpoint: 480,
//         options: {
//           chart: {
//             width: 200,
//           },
//           legend: {
//             show: false,
//           },
//         },
//       },
//     ],
//     legend: {
//       position: 'right',
//       offsetY: 0,
//       height: 230,
//     },
//   };

//   return (
//     <div>
//       <button
//         type="button"
//         onClick={(e) => {
//           filterDailyData(e.target.value || e.target.textContent);
//         }}
//       >
//         2023-01-13
//       </button>
//       <div className="chart-wrap">
//         <div id="chart">
//           <ReactApexChart
//             options={options}
//             series={series}
//             type="donut"
//             width={380}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateDonutWeekly;
