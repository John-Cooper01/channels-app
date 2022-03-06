import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    statusCreate: false,
    chatMessage: [{ chatName: '', messages: Array<string>() }],
  },
  reducers: {
    isCreateChat(state, { payload }) {
      return { statusCreate: payload, chatMessage: state.chatMessage };
    },
    isHandleChat(state, { payload }) {
      return { statusCreate: false, chatMessage: payload };
    },
  },
});

export const { isCreateChat, isHandleChat } = chatSlice.actions;

export default chatSlice.reducer;
