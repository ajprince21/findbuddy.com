import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMessages,
  getUserChatList,
  sendMessages,
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
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },

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
      })

      // Send - Message
      .addCase(sendMessages.pending, (state, action) => {
        // If Pending
      })
      .addCase(sendMessages.fulfilled, (state, action) => {
        state.messages = [...state.messages, ...[action.payload]];
      })
      .addCase(sendMessages.rejected, (state, action) => {
        // On Request Rejected
      });
  },
});
export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
