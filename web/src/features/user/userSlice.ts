import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";


const token =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSWduYWNpbyBGZWRvcmVuY28iLCJlbWFpbCI6ImlnbmFjaW9mZWRvcmVuY28yMzE3QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJHBhc3MxMjMiLCJhbGlhcyI6IklnbkZlZCIsInVzZXJUeXBlIjoiQWdlbmN5IiwiZGVzY3JpcHRpb24iOiJBZ2VuY2lhIGRlIHZpYWplcyIsImNvbnRhY3RzIjp7IndoYXRzYXBwIjoiKzU0MTEyMzkxOTI5MyJ9LCJpZCI6IjYzNDg2YTRlMWQ1NmRhZTEzZTE0M2Y1ZCIsImlhdCI6MTY2NTY5MDE5Mn0.qdskdVBtIfSg8NL89RuhgQWYzplfi6UAtJkcoKrQwAg";

export const loadUser = createAsyncThunk("tours/loadUser", async () => {

   const response = await fetch("http://localhost:3001/users", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  
  const json = await response.json();
  
  
  return json.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userArray: null,
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userArray = action.payload;
      })
      .addCase(loadUser.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const selectUser = (state: RootState ) => state.user.userArray;
export const selectIsLoadingUser = (state: RootState ) => state.user.isLoading;
export const selectHasErrorUser= (state: RootState) => state.user.hasError;

export default userSlice.reducer;
