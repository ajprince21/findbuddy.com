import { createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import chatThunks from "../api/chat";

// Get user Chat List Data
export const getUserChatList = createAsyncThunk(
  "chat/userChat",
  async (_, { rejectWithValue }) => {
    try {
      const response = await chatThunks.getUserChatList();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong!");
    }
  }
);

// Get user Messages
export const fetchMessages = createAsyncThunk(
  "chat/messages",
  async (params, { rejectWithValue }) => {
    try {
      const response = await chatThunks.fetchMessages(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Error whiles fetching messages");
    }
  }
);
