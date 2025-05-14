import { configureStore } from '@reduxjs/toolkit';
import topicsReducer from './slices/topics';
import authReducer from './slices/auth';
import teamReducer from './slices/team';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';


const persistConfig = {
  key: 'root',
  version: 1,
  storage, 
  whitelist: ['topics'], 
};


const rootReducer = combineReducers({
  topics: topicsReducer,
  auth: authReducer,
  team: teamReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
