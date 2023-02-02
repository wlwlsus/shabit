import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import videoSlice from './videoSlice';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux';
import chartSlice from './chartSlice';
import adminSlice from './adminSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    video: videoSlice.reducer,
    chart: chartSlice.reducer,
    admin: adminSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const typedUseSelector: TypedUseSelectorHook<RootState> =
  useReduxSelector;
