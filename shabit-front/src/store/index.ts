import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import videoSlice from './videoSlice';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux';
import chartSlice from './chartSlice';
import timeSlice from './timeSlice';
import adminSlice from './adminSlice';
import goalSlice from './goalSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    video: videoSlice.reducer,
    chart: chartSlice.reducer,
    time: timeSlice.reducer,
    admin: adminSlice.reducer,
    goal: goalSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const typedUseSelector: TypedUseSelectorHook<RootState> =
  useReduxSelector;
