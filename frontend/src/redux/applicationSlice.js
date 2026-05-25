import { createSlice } from "@reduxjs/toolkit";

export const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants: [],
  },
  reducers: {
    setAllapplications: (state, action) => {
      state.applicants = action.payload;
    },
  },
});

export const { setAllapplications } = applicationSlice.actions;

export default applicationSlice.reducer;
