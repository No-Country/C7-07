import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";


const token = window.localStorage.getItem("token");


export const loadTours = createAsyncThunk("tours", async () => {
  
  const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/tours/`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const json = await response.json();
  return json.data;
});


export const toursSlice = createSlice({
  name: "tours",
  initialState: {
    toursArray: null,
    isLoading: false,
    hasError: false,
  },
  reducers: {},
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
      })

  },
});

export const selectTours = (state: RootState ) => state.tours.toursArray;
export const selectIsLoadingTours = (state: RootState ) => state.tours.isLoading;
export const selectHasErrorTours = (state: RootState) => state.tours.hasError;


export default toursSlice.reducer;
