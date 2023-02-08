import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'adminSlice',
  initialState: {
    videoList: [],
    videoCategories: [
      {
        categoryId: 1,
        name: '목 스트레칭',
      },
      {
        categoryId: 2,
        name: '허리 스트레칭',
      },
      {
        categoryId: 3,
        name: '전신 스트레칭',
      },
    ],
    quetesList: [],
    stretchingTime: 50 * 60 * 1000,
    alertTime: 3 * 60 * 1000,
  },
  reducers: {
    setVideoList: (state, action) => {
      state.videoList = action.payload;
    },
    setVideoCategories: (state, action) => {
      state.videoCategories = action.payload;
    },
    setQuetesList: (state, action) => {
      state.quetesList = action.payload;
    },
    setStretchingTime: (state, action) => {
      state.stretchingTime = Number(action.payload) * 60 * 1000;
    },
    setAlertTime: (state, action) => {
      state.alertTime = Number(action.payload) * 60 * 1000;
    },
  },
});

export default adminSlice;
export const {
  setVideoList,
  setVideoCategories,
  setQuetesList,
  setStretchingTime,
  setAlertTime,
} = adminSlice.actions;
