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
import poseSlice from './poseSlice';
import trackingSlice from './trackingSlice';
import modeSlice from './modeSlice';
import mediaSlice from './mediaSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    video: videoSlice.reducer,
    chart: chartSlice.reducer,
    time: timeSlice.reducer,
    admin: adminSlice.reducer,
    goal: goalSlice.reducer,
    pose: poseSlice.reducer,
    tracking: trackingSlice.reducer,
    mode:modeSlice.reducer,
    media:mediaSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const typedUseSelector: TypedUseSelectorHook<RootState> =
  useReduxSelector;
