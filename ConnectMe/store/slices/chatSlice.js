import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMessages,
  getUserChatList,
  sendMessages,
  fetchMessagesCount,
} from "../../src/services/thunks/chatThunks";

const initialState = {
  chatList: [],
  chatListLoading: false,
  error: null,
  messages: [],
  messagesLoading: false,
  loadingMore: false,
  hasMoreMessages: true,
  loadingMessageCount: false,
  totalMessage: 0,
};
const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.unshift(action.payload);
    },
    resetMessage: (state, action) => {
      state.messages = [];
    },
    setLoading: (state, action) => {
      state.loadingMore = action.payload;
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
        state.messagesLoading = true;
        state.loadingMore = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.hasMoreMessages = false;
        } else {
          state.hasMoreMessages = true;
        }
        state.messages.push(...action.payload);
        state.messagesLoading = false;
        state.loadingMore = false;
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.messagesLoading = false;
        state.loadingMore = false;
        state.error = action.payload;
      })

      // Fetch message count
      .addCase(fetchMessagesCount.pending, (state, action) => {
        state.loadingMessageCount = true;
      })
      .addCase(fetchMessagesCount.fulfilled, (state, action) => {
        state.loadingMessageCount = false;
        state.totalMessage = action.payload.total;
      })
      .addCase(fetchMessagesCount.rejected, (state, action) => {
        state.loadingMessageCount = false;
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
export const { addMessage, resetMessage, setLoading } = chatSlice.actions;
export default chatSlice.reducer;
