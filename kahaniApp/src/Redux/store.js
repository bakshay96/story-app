// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './Slices/authSlice';
import { storySlice } from './Slices/storySlice';

const authReducer=authSlice.reducer;
const storyReducer=storySlice.reducer;
export const store = configureStore({
  reducer: {
    auth:authReducer,
    story:storyReducer,
  },
});
