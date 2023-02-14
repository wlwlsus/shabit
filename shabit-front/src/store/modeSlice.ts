import { createSlice } from '@reduxjs/toolkit';

const modeSlice = createSlice({
  name: 'modeSlice',
  initialState: {
    mode:'main',
    videoSetting:false,
  },
  reducers: {
    setMode: (state,action)=>{
        state.mode = action.payload;
    },
    setVideoSetting : (state,action) =>{
      state.videoSetting = action.payload;
    }
  },
});

export default modeSlice;
export const { setMode,setVideoSetting } = modeSlice.actions;

