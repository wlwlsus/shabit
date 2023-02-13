import { createSlice } from '@reduxjs/toolkit';

const timeSlice = createSlice({
  name: 'timeSlice',
  initialState: {
    stretchTime: {min:50,sec:0},
    usedTime : {hour:0,min:0},
    alertTime:0,
    isRunning:false,//TODO:isStop이랑 isRunning중에 하나만 있어도되는지 확인해야됨
    isStop:false,
  },
  reducers: {
    setInitTime: (state,action)=>{
        state.stretchTime.min = action.payload.stretchingTime;
        state.alertTime = action.payload.alertTime *3; // TODO 일단 9초 나중에 *60붙여야함
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
        if(state.stretchTime.min===0 && state.stretchTime.sec===0){
          state.isRunning = false;
        }
        else if(state.stretchTime.sec===0){
            state.stretchTime.sec =59;
            state.stretchTime.min-=1;
        }
        else state.stretchTime.sec-=1;
    },
    setIsRunning :(state,action)=>{
        state.isRunning = action.payload;
    },
    setIsStop :(state,action)=>{
      state.isStop = action.payload;
    }
  },
});

export default timeSlice;
export const { setInitTime,calStretchTime,calUsedTime,setIsRunning,setIsStop } = timeSlice.actions;

