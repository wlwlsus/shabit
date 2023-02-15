import { createSlice } from '@reduxjs/toolkit';

const timeSlice = createSlice({
  name: 'timeSlice',
  initialState: {
    stretchTime: {min:50,sec:0},
    usedTime : {hour:0,min:0}
  },
  reducers: {
    setInitStretchingTime : (state,action) =>{
      state.stretchTime.min = action.payload;
      state.stretchTime.sec = 0;
    },
    setInitUsedTime : (state) =>{
      state.usedTime.hour = 0;
      state.usedTime.min = 0;
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
    }
  },
});

export default timeSlice;
export const { setInitStretchingTime,calStretchTime,calUsedTime,setInitUsedTime } = timeSlice.actions;

