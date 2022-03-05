import { configureStore } from '@reduxjs/toolkit';
import userReducer from './featureUser/userSlice';
import chatReducer from './featureChat/chatSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
});
