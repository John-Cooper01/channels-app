import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {
    user: '',
    isLoggedIn: false,
  },
  reducers: {
    chengeUser(state, { payload }) {
      return { ...state, isLoggedIn: true, user: payload };
    },
    logout(state) {
      return { ...state, isLoggedIn: false, user: '' };
    },
  },
});

export const { chengeUser, logout } = slice.actions;

//export const selectUser: any = state => state.user.user;

export default slice.reducer;
