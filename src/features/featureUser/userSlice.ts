import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
    userId: '',
    // userEmail: '',
  },
  reducers: {
    isInfo(state, { payload }) {
      return { isAuth: true, userId: payload };
    },
    isLogin(state, { payload }) {
      //return { ...state, isAuth: true };
      return { isAuth: payload, userId: payload };
    },
    isLogout(state, { payload }) {
      //return { ...state, isAuth: false };
      return { isAuth: payload, userId: payload };
    },
  },
});

export const { isInfo, isLogin, isLogout } = userSlice.actions;

export default userSlice.reducer;
