import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";


const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSWduYWNpbyBGZWRvcmVuY28iLCJlbWFpbCI6ImlnbmFjaW9mZWRvcmVuY28yMzE3QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJHBhc3MxMjMiLCJhbGlhcyI6IklnbkZlZCIsInVzZXJUeXBlIjoiQWdlbmN5IiwiZGVzY3JpcHRpb24iOiJBZ2VuY2lhIGRlIHZpYWplcyIsImNvbnRhY3RzIjp7IndoYXRzYXBwIjoiKzU0MTEyMzkxOTI5MyJ9LCJpZCI6IjYzNDg2YTRlMWQ1NmRhZTEzZTE0M2Y1ZCIsImlhdCI6MTY2NTY5MDE5Mn0.qdskdVBtIfSg8NL89RuhgQWYzplfi6UAtJkcoKrQwAg";



export const loadTourById = createAsyncThunk("loadTourById", async (tourId) =>{
    const response = await fetch(`http://localhost:3001/tours/${tourId}`,{
        headers: {
        Authorization: "Bearer " + token,
        },
    });
    const json = await response.json();
    return json.data;
}) 

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
