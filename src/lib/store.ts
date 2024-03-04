// store.ts

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "../lib/features/auth.slice";
export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false, // Disable ImmutableStateInvariantMiddleware
      serializableCheck: false, // If you want to disable serializableCheck as well
    });
  },
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
