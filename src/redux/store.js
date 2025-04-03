import { configureStore } from '@reduxjs/toolkit';
import topicsReducer from './slices/topics';

export const store = configureStore({
  reducer: {
    topics: topicsReducer,
  },
});

export default store;