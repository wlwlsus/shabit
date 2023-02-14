import { createSlice } from '@reduxjs/toolkit';

const trackingSlice = createSlice({
  name: 'trackingSlice',
  initialState: {
    recordedChunks: [],
    videoModal: false,
    logArray: [],
    capture: false,
    onTracking: true,
  },
  reducers: {
    setRecordedChunks: (state, action) => {
      state.recordedChunks = action.payload;
    },
    clearRecordedChunks: (state) => {
      state.recordedChunks = [];
    },
    setVideoModal: (state, action) => {
      state.videoModal = action.payload;
    },
    setLogArray: (state, action) => {
      state.logArray = [...state.logArray, action.payload];
    },
    setInitLogArray: (state) => {
      state.logArray = [];
    },
    setCapture: (state, action) => {
      state.capture = action.payload;
    },
    setOnTracking: (state, action) => {
      state.onTracking = action.payload;
    },
  },
});

export default trackingSlice;
export const {
  setRecordedChunks,
  clearRecordedChunks,
  setVideoModal,
  setLogArray,
  setInitLogArray,
  setCapture,
  setOnTracking,
} = trackingSlice.actions;
