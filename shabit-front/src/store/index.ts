import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import videoSlice from './videoSlice';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux';
import chartSlice from './chartSlice';
import timeSlice from './timeSlice';
import poseSlice from './poseSlice';
import trackingSlice from './trackingSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    video: videoSlice.reducer,
    chart: chartSlice.reducer,
    time:timeSlice.reducer,
    pose: poseSlice.reducer,
    tracking : trackingSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const typedUseSelector: TypedUseSelectorHook<RootState> =
  useReduxSelector;
