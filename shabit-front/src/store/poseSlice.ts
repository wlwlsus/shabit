import { createSlice } from '@reduxjs/toolkit';

const poseSlice = createSlice({
  name: 'poseSlice',
  initialState: {
    pose:'',
  },
  reducers: {
    setPose: (state,action)=>{
        state.pose = action.payload;
    },
  },
});

export default poseSlice;
export const { setPose } = poseSlice.actions;

