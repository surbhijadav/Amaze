import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    feedbackStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    feedbackSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    feedbackError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { feedbackStart, feedbackSuccess, feedbackError } = feedbackSlice.actions;
export default feedbackSlice.reducer;
