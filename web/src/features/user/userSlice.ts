import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const token = window.localStorage.getItem("token");

export const loadUser = createAsyncThunk("tours/loadUser", async () => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/users`, {
    headers: {
      Authorization: "bearer " + token,
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

export const selectUser = (state: RootState) => state.user.userArray;
export const selectIsLoadingUser = (state: RootState) => state.user.isLoading;
export const selectHasErrorUser = (state: RootState) => state.user.hasError;

export default userSlice.reducer;
