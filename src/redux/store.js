import { configureStore } from '@reduxjs/toolkit';
import topicsReducer from './slices/topics';
import authReducer from './slices/auth';

export const store = configureStore({
  reducer: {
    topics: topicsReducer,
    auth: authReducer,
  },
});

export default store;