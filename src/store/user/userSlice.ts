import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
    userInfo: { id: '', email: '' },
  },
  reducers: {
    isInfo(state, { payload }) {
      return { isAuth: true, userInfo: payload };
    },
    isLogin(state, { payload }) {
      return { isAuth: payload, userInfo: state.userInfo };
    },
    isLogout(state, { payload }) {
      return { isAuth: payload, userInfo: state.userInfo };
    },
  },
});

export const { isInfo, isLogin, isLogout } = userSlice.actions;

export default userSlice.reducer;
