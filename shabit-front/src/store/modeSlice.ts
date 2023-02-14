import { createSlice } from '@reduxjs/toolkit';

const modeSlice = createSlice({
  name: 'modeSlice',
  initialState: {
    mode:'main',
  },
  reducers: {
    setMode: (state,action)=>{
        state.mode = action.payload;
    },
  },
});

export default modeSlice;
export const { setMode } = modeSlice.actions;

