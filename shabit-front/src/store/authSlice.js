import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    accessToken: '',
    user: { email: '', nickname: '', profile: '', theme: 0 },
  },
  reducers: {
    setTokenState: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserState: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    onLogin: (state, action) => {},
  },
});

export default authSlice;
export const { setTokenState, setUserState } = authSlice.actions;
