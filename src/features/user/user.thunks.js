import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const signUp = createAsyncThunk(
  "user/signUp",
  async function ({ email, password }, { rejectWithValue }) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const logIn = createAsyncThunk(
  "user/logIn",
  async function ({ email, password }, { rejectWithValue }) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const logOut = createAsyncThunk(
  "user/logOut",
  async function (_, { rejectWithValue }) {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);
