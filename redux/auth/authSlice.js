import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "./authOperations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleFulfilled = (state, action) => {
  state.items.push(action.payload);
  state.isLoading = false;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action?.payload;
  state.items = [];
};

const initialState = {
  userId: null,
  nickname: null,
  email: null,
  isLoading: false,
  error: null,
  isAuth: false,
  stateChange: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile(state, { payload }) {
      console.log("updateUserPr", payload);
      state.userId = payload?.userId;
      state.nickname = payload?.nickname;
      state.email = payload?.email;
    },
    authStateChanged(state, { payload }) {
      state.stateChange = payload?.stateChange;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload?.email;
        state.userId = action.payload?.uid;
        state.email = action.payload?.email;
        state.isAuth = true;
      })

      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload?.email;
        state.userId = action.payload?.uid;
        state.isAuth = true;
      })

      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.rejected, handleRejected)
      .addCase(logoutUser.fulfilled, (state, action) => {
        // state = initialState;
        state.isLoading = false;
        state.email = null;
        state.userId = null;
        state.isAuth = false;
        state.stateChange = false;
      });
  },
});

export const { updateUserProfile, authStateChanged } = authSlice.actions;
export const authReducer = authSlice.reducer;
