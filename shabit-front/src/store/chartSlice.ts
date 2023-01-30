import { createSlice } from '@reduxjs/toolkit';

const chartSlice = createSlice({
  name: 'chartSlice',
  initialState: {
    dailyData: [],
    heatMapData: [],
    monthlyData: [],
    weeklyData: [],
    updatingDonutData: [],
  },
  reducers: {
    setDailyData: (state, action) => {
      state.dailyData = action.payload;
    },
    setHeatMapData: (state, action) => {
      state.heatMapData = action.payload;
    },
  },
});

export default chartSlice;
export const {} = chartSlice.actions;
