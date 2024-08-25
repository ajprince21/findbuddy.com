import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMessages,
  getUserChatList,
} from "../../src/services/thunks/chatThunks";

const initialState = {
  chatList: [],
  chatListLoading: false,
  error: null,
  messages: [],
  messagesLoading: false,
};
const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getUserChatList.pending, (state) => {
        state.chatListLoading = true;
      })
      .addCase(getUserChatList.fulfilled, (state, action) => {
        state.chatList = action.payload;
        state.chatListLoading = false;
        state.error = null;
      })
      .addCase(getUserChatList.rejected, (state, action) => {
        state.chatList = [];
        state.chatListLoading = false;
        state.error = action.payload;
      })
      // Handling fetchMessages
      .addCase(fetchMessages.pending, (state, action) => {
        state.messages = [];
        state.messagesLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.messagesLoading = false;
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.messages = [];
        state.messagesLoading = false;
        state.error = action.payload;
      });
  },
});

export default chatSlice.reducer;
