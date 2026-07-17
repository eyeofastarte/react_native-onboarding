import { createSlice } from "@reduxjs/toolkit";

const counter = createSlice({
  name: 'Counter',
  initialState: { count:0 },
  reducers: {
    increment: (s) => {
      s.count += 1;
    }
  }
})

export const { increment } = counter.actions
export default counter.reducer
