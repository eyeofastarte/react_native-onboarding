import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'pfApples',
  initialState: { apples: 0, },
  reducers: {
    increment: (state) => { state.apples += 1; },
    decrement: (state) => { state.apples -= 1; },
    reset: (state) => { state.apples = 0; },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
