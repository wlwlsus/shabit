import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    accessToken: '',
    user: { email: '', nickname: '', profile: '', theme: 0 },
    isAdmin: false,
  },
  reducers: {
    setTokenState: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserState: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setIsAdminState: (state, action) => {
      state.isAdmin = action.payload;
    },
    clearAuthState: (state) => {
      state = {
        accessToken: '',
        user: { email: '', nickname: '', profile: '', theme: 0 },
        isAdmin: false,
      };
    },
  },
});

export default authSlice;
export const { setTokenState, setUserState, setIsAdminState, clearAuthState } =
  authSlice.actions;
