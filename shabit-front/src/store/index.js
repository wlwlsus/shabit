import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import videoSlice from './videoSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    video: videoSlice.reducer,
  },
});

export default store;
