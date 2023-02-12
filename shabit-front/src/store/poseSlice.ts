import { createSlice } from '@reduxjs/toolkit';

const poseSlice = createSlice({
  name: 'poseSlice',
  initialState: {
    pose:'',
    poseId:-1,
  },
  reducers: {
    setPose: (state,action)=>{
        state.pose = action.payload;
    },
    setPoseId :(state,action)=>{
      state.poseId = action.payload;
    }
  },
});

export default poseSlice;
export const { setPose,setPoseId } = poseSlice.actions;

