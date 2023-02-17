import { createSlice } from '@reduxjs/toolkit';

const modeSlice = createSlice({
  name: 'modeSlice',
  initialState: {
    mode:'main',
    videoSetting:false,
    tmp:false,
  },
  reducers: {
    setMode: (state,action)=>{
        state.mode = action.payload;
    },
    setVideoSetting : (state,action) =>{
      state.videoSetting = action.payload;
    },
    setTmp:(state,action)=>{
      state.tmp = action.payload;
    }
  },
});

export default modeSlice;
export const { setMode,setVideoSetting,setTmp } = modeSlice.actions;

