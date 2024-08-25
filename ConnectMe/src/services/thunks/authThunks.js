// src/services/api/thunks/authThunks.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../api/auth";
import Toast from "react-native-toast-message";
import { Alert } from "react-native";

// Async thunk for registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.registerUser(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.userLogin(userData);
      return response.data;
    } catch (error) {
      console.log(error?.response?.data?.message);
      Alert.alert(error.response?.data?.message);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  return null;
});
