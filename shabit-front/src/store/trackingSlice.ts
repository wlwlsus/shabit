import { createSlice } from '@reduxjs/toolkit';

const trackingSlice = createSlice({
  name: 'trackingSlice',
  initialState: {
    recordedChunks:[],
    videoModal : false,
  },
  reducers: {
    setRecordedChunks : (state,action) =>{
        state.recordedChunks = action.payload;
    },
    clearRecordedChunks : (state) =>{
        state.recordedChunks = [];
    },
    setVideoModal : (state,action)=>{
      state.videoModal = action.payload;
    }
  },
});

export default trackingSlice;
export const { setRecordedChunks,clearRecordedChunks,setVideoModal } = trackingSlice.actions;

