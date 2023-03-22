import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authStateChanged, updateUserProfile } from "./authSlice";

export const authSignInUser = () => async (dispatch, getState) => {
  try {
    await auth.createUserWithEmailAndPassword("emai", "password");
  } catch (error) {
    throw error;
  }
};

export const authSignUpUser =
  ({ nickname, email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      console.log("err", error);
      console.log("err.message", error.message);
      throw error;
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await auth.createUserWithEmailAndPassword("emai", "password");
  } catch (error) {
    throw error;
  }
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ nickname, email, password }, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: nickname,
      });
      const { uid, displayName } = auth.currentUser;

      thunkAPI.dispatch(
        updateUserProfile({
          userId: uid,
          nickname: displayName,
        })
      );
      // return user;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authStateChangedUser = createAsyncThunk(
  "auth/stateChanged",
  async (_, thunkAPI) => {
    try {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          thunkAPI.dispatch(
            updateUserProfile({
              userId: user.uid,
              nickname: user.displayName,
            })
          );
          thunkAPI.dispatch(authStateChanged({ stateChange: true }));
        }
        //  setUser(user);
      });
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
