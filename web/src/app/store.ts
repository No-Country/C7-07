import { configureStore } from "@reduxjs/toolkit";
import toursSlice from "../features/tours/toursSlice";

export const store = configureStore({
  reducer: {
    tours: toursSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch