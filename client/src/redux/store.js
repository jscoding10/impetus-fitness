import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Root reducer - can add more reducers if have
const rootReducer = combineReducers({ user: userReducer });

// Sets key in local storage
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Persisted reducer - persist config sets key in local storage
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);