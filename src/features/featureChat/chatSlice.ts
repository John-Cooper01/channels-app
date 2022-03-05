import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    statusCreate: false,
  },
  reducers: {
    isCreateChat(state, { payload }) {
      return { statusCreate: payload };
    },
  },
});

export const { isCreateChat } = chatSlice.actions;

export default chatSlice.reducer;
