import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    accessToken: '',
    profile: { email: '', nickname: '', profile: '', theme: 0 },
  },
  reducers: {
    setTokenState: (state, action) => {
      state.accessToken = action.payload;
    },
    setProfileState: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
  },
});

export default authSlice;
export const { setTokenState, setProfileState } = authSlice.actions;
