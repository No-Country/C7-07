import { configureStore } from "@reduxjs/toolkit";
import { socialApi } from "../services/social";
import toursReducer from "../features/tours/toursSlice" 
import userSlice from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    tours: toursReducer,
    user: userSlice,
    [socialApi.reducerPath]: socialApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socialApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch