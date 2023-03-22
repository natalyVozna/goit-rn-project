import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer, authSlice } from "./auth/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  // [authSlice.name]: authSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
