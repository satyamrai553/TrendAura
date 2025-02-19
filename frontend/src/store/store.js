import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice.js';
import cathSlice from './cartSlice.js';
const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cathSlice
  },
});

export  default store;
