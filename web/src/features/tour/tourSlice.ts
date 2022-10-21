import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const token = window.localStorage.getItem("token");

export const loadTourById = createAsyncThunk(
  "loadTourById",
  async (tourId: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URI}/tours/${tourId}`,
      {
        headers: {
          Authorization: "bearer " + token,
        },
      }
    );
    const json = await response.json();
    return json.data;
  }
);

export const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tourObj: null,
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTourById.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadTourById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tourObj = action.payload;
      })
      .addCase(loadTourById.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const selectTour = (state: RootState) => state.tour.tourObj;
export const selectIsLoadingTour = (state: RootState) => state.tour.isLoading;
export const selectHasErrorTour = (state: RootState) => state.tour.hasError;

export default tourSlice.reducer;
