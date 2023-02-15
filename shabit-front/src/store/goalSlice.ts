import { createSlice } from '@reduxjs/toolkit';

const goalSlice = createSlice({
  name: 'goalSlice',
  initialState: {
    goalModal: false,
    percentage: 0,
    time: 0,
  },
  reducers: {
    setGoalModal: (state, action) => {
      state.goalModal = action.payload;
    },
    setPercentage: (state, action) => {
      state.percentage = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
  },
});

export default goalSlice;
export const { setGoalModal, setPercentage, setTime } = goalSlice.actions;
