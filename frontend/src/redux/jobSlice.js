import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   value: 0,
// };

export const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allappliedJobs: [],
    searchQuery: ""
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },

    setsingleJob: (state, action) => {
      state.singleJob = action.payload;
    },

    setallAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },

    setsearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },

    setAllAppliedJobs: (state, action) => {
      state.allappliedJobs = action.payload;
    },

    setsearchQuery: (state, action) => {
      state.searchQuery = action.payload
    }
  },
});

export const {
  setAllJobs,
  setsingleJob,
  setallAdminJobs,
  setsearchJobByText,
  setAllAppliedJobs,
  setsearchQuery
} = jobSlice.actions;

export default jobSlice.reducer;
