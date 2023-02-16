import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  user: { email: '', nickname: '', profile: '', theme: 0 },
  isAdmin: false,
  passwordModal: false,
  isSocial: false,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
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
    setIsSocialState: (state, action) => {
      state.isSocial = action.payload;
    },
    clearAuthState: (state) => {
      state = initialState;
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
  setIsSocialState,
} = authSlice.actions;
