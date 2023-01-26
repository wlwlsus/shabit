import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
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
  },
});

export default userSlice;
export const { setTokenState, setUserState } = userSlice.actions;
