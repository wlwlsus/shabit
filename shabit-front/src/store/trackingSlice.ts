import { createSlice } from '@reduxjs/toolkit';

const trackingSlice = createSlice({
  name: 'trackingSlice',
  initialState: {
    recordedChunks:[],
    videoModal : false,
    logArray:[],
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
    },
    setLogArray : (state,action) =>{
      state.logArray = [...state.logArray,action.payload];
      console.log(state.logArray);
    },
    setInitLogArray :(state)=>{
      state.logArray =[];
    }
  },
});

export default trackingSlice;
export const { setRecordedChunks,clearRecordedChunks,setVideoModal,setLogArray,setInitLogArray } = trackingSlice.actions;

