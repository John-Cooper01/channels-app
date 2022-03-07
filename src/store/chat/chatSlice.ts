import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    statusCreate: false,
    chatMessage: { id: '', uid: '', chatName: '', messages: [''] },
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
