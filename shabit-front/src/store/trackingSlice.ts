import { createSlice } from '@reduxjs/toolkit';

const trackingSlice = createSlice({
  name: 'trackingSlice',
  initialState: {
    recordedChunks: [],
    videoModal: false,
    logArray: [],
    capture: false,
    trackingSetting: false,
    settingLog: false,
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
      console.log(action.payload);
      state.logArray = [...state.logArray, action.payload];
      console.log(state.logArray);
    },
    setInitLogArray: (state) => {
      state.logArray = [];
    },
    setCapture: (state, action) => {
      state.capture = action.payload;
    },
    setTrackingSetting: (state, action) => {
      state.trackingSetting = action.payload;
    },
    setSettingLog: (state, action) => {
      state.settingLog = action.payload;
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
  setTrackingSetting,
  setSettingLog,
} = trackingSlice.actions;
