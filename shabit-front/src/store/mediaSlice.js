import { createSlice } from '@reduxjs/toolkit';

const mediaSlice = createSlice({
  name: 'mediaSlice',
  initialState: {
    mediaRecorderRef: null,
    webcamRef:null,
    stream:null,
  },
  reducers: {
    setMediaRecorder: (state,action)=>{
        state.mediaRecorderRef = action.payload;
    },
    setWebCam : (state,action)=>{
        state.webcamRef = action.payload;
    },
    setStream: (state,action)=>{
        state.stream = action.payload;
    }
  },
});

export default mediaSlice;
export const { setMediaRecorder,setWebCam,setStream } = mediaSlice.actions;

