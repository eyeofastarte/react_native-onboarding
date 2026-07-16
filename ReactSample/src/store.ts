import { configureStore } from '@reduxjs/toolkit';
import pfAppleCountSlice from './components/counter/pfAppleCountSlice';

export const store = configureStore({
  reducer: {
    myApples: pfAppleCountSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
