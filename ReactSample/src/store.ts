import { configureStore } from '@reduxjs/toolkit';
import pfAppleCountSlice from './components/pfApples/pfAppleCountSlice';
import counterSlice from './components/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    myApples: pfAppleCountSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
