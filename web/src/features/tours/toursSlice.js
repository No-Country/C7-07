import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadTours = createAsyncThunk("tours/loadTours", async () => {
  const response = await fetch(`http://localhost:3001/tours`);
  const json = await response.json();
  return json.data;
});

export const toursSlice = createSlice({
  name: "tours",
  initialState: {
    toursArray: [],
    isLoading: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTours.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadTours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.toursArray = action.payload;
        
      })
      .addCase(loadTours.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const selectTours = (state) => state.tours.toursArray;
export const selectIsLoadingTours = (state) => state.tours.isLoading;
export const selectHasErrorTours = (state) => state.tours.hasError;

export default toursSlice.reducer;
