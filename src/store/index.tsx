import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { reducers as newWalletReducer } from './wallet';

export const createStore = (preloadedState: Record<string, unknown>) =>
  configureStore({
    reducer: {
      ...newWalletReducer,
    },
    preloadedState,
  });

const store = createStore({});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
