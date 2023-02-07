import { createSlice } from '@reduxjs/toolkit';

const timeSlice = createSlice({
  name: 'timeSlice',
  initialState: {
    stretchTime: {min:0,sec:0},
    usedTime : {hour:0,min:0},
    isRunning:true
  },
  reducers: {
    setInitTime: (state,action)=>{
        state.stretchTime.min = action.payload;
        state.stretchTime.sec = 0;
        state.usedTime.hour =0;
        state.usedTime.min =0;
    },
    calUsedTime :(state) =>{
        if(state.usedTime.min===59){
            state.usedTime.min =0;
            state.usedTime.hour+=1;
        }
        else state.usedTime.min+=1;
    },
    calStretchTime :(state) =>{
        if(state.stretchTime.sec===0){
            state.stretchTime.sec =59;
            state.stretchTime.min-=1;
        }
        else state.stretchTime.sec-=1;
    },
    setIsRunning :(state)=>{
        state.isRunning = !state.isRunning;
    }
  },
});

export default timeSlice;
export const { setInitTime,calStretchTime,calUsedTime,setIsRunning } = timeSlice.actions;

