import { createSlice } from '@reduxjs/toolkit';

const chartSlice = createSlice({
  name: 'chartSlice',
  initialState: {
    dailyData: [],
    heatMapData: [],
    heatMapSeries: [],
    monthlyData: [],
    weeklyData: [],
    updatingDonutData: [],
    randomQuote: '',
  },
  reducers: {
    setDailyData: (state, action) => {
      state.dailyData = action.payload;
    },
    setHeatMapData: (state, action) => {
      state.heatMapData = action.payload;
    },
    setHeatMapSeries: (state, action) => {
      state.heatMapSeries = action.payload;
    },
    setMonthlyData: (state, action) => {
      state.monthlyData = action.payload;
    },
    setWeeklyData: (state, action) => {
      state.weeklyData = action.payload;
    },
    setUpdationgDonutData: (state, action) => {
      state.updatingDonutData = action.payload;
    },
    setRandomQuote: (state, action) => {
      state.randomQuote = action.payload;
    },
  },
});

export default chartSlice;
export const {
  setDailyData,
  setHeatMapData,
  setHeatMapSeries,
  setMonthlyData,
  setWeeklyData,
  setUpdationgDonutData,
  setRandomQuote,
} = chartSlice.actions;
