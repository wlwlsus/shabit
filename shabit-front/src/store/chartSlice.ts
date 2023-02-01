import { createSlice } from '@reduxjs/toolkit';

const chartSlice = createSlice({
  name: 'chartSlice',
  initialState: {
    dailyData: [],
  },
  reducers: {
    setDailyData: (state, action) => {
      state.dailyData = action.payload;
    },
  },
});

export default chartSlice;
export const { setDailyData } = chartSlice.actions;
