import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSWduYWNpbyBGZWRvcmVuY28iLCJlbWFpbCI6ImlnbmFjaW9mZWRvcmVuY28yMzE3QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJHBhc3MxMjMiLCJhbGlhcyI6IklnbkZlZCIsInVzZXJUeXBlIjoiQWdlbmN5IiwiZGVzY3JpcHRpb24iOiJBZ2VuY2lhIGRlIHZpYWplcyIsImNvbnRhY3RzIjp7IndoYXRzYXBwIjoiKzU0MTEyMzkxOTI5MyJ9LCJpZCI6IjYzNDg2YTRlMWQ1NmRhZTEzZTE0M2Y1ZCIsImlhdCI6MTY2NTY5MDE5Mn0.qdskdVBtIfSg8NL89RuhgQWYzplfi6UAtJkcoKrQwAg";


export const loadTours = createAsyncThunk("tours/loadTours", async () => {
  const response = await fetch(`http://localhost:3001/tours`,{
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const json = await response.json();
  return json.data;
});


export const loadTourById = createAsyncThunk("tour/loadTour", async (agencyId, tourId) =>{
  const response = await fetch(`http://localhost:3001/tours/${agencyId}/${tourId}`,{
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const json = await response.json();
  return json.data;
}) 

export const toursSlice = createSlice({
  name: "tours",
  reducers: {},
  initialState: {
    toursArray: [],
    tourObj: {},
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
      })
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

export const selectTours = (state: any) => state.tours.toursArray;
export const selectIsLoadingTours = (state) => state.tours.isLoading;
export const selectHasErrorTours = (state) => state.tours.hasError;

export const selectTour = (state: any) => state.tours.tourObj;
export const selectIsLoadingTour = (state) => state.tours.isLoading;
export const selectHasErrorTour = (state) => state.tours.hasError;


export default toursSlice.reducer;
