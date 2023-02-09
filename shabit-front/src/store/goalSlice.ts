import { createSlice } from '@reduxjs/toolkit';

const goalSlice = createSlice({
  name: 'goalSlice',
  initialState: {
    goalModal : false,
  },
  reducers: {
    setGoalModal : (state, action)=>{
      state.goalModal = action.payload;
    }
  },
});

export default goalSlice;
export const { setGoalModal } = goalSlice.actions;