import { createSlice } from '@reduxjs/toolkit';

const chartSlice = createSlice({
  name: 'chartSlice',
  initialState: {
    heatmapData: [],
    quote: [],
  },
  reducers: {
    setHeatmapData: (state, action) => {
      state.heatmapData = action.payload;
    },
    setQuote: (state, action) => {
      state.quote = action.payload;
    },
  },
});

export default chartSlice;
export const { setHeatmapData, setQuote } = chartSlice.actions;
