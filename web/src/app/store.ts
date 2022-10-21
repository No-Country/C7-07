import { configureStore } from "@reduxjs/toolkit";
import { socialApi } from "../services/social";
import toursReducer from "../features/tours/toursSlice";
import userReducer from "../features/user/userSlice";
import tourReducer from "../features/tour/tourSlice";

export const store = configureStore({
  reducer: {
    tours: toursReducer,
    tour: tourReducer,
    user: userReducer,
    [socialApi.reducerPath]: socialApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socialApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
z