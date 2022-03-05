import { configureStore } from '@reduxjs/toolkit';
import userReducer from './featureUser/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
