import { configureStore } from '@reduxjs/toolkit';
import wordsSlice from './slices/wordsSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    words: wordsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
