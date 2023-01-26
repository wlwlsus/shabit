import { createSlice } from '@reduxjs/toolkit';
import Auth from '../services/auth';

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
    onLogin: (state, action) => {
      const { email, password, autoLogin } = action.payload;
      Auth.login(email, password)
        .then(({ user, accessToken }) => {
          state.user = user;
          state.accessToken = accessToken;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

export default authSlice;
export const { setTokenState, setUserState, onLogin } = authSlice.actions;
