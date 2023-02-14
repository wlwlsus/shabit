import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    accessToken: '',
    user: { email: '', nickname: '', profile: '', theme: 0 },
    isAdmin: false,
    passwordModal: false,
  },
  reducers: {
    setPasswordModal: (state, action) => {
      state.passwordModal = action.payload;
    },
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
        passwordModal: false,
      };
    },
  },
});

export default authSlice;
export const {
  setPasswordModal,
  setTokenState,
  setUserState,
  setIsAdminState,
  clearAuthState,
} = authSlice.actions;
