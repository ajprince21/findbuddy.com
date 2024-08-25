import { createSlice } from "@reduxjs/toolkit";
import { getUserChatList } from "../../src/services/thunks/chatThunks";

const initialState = {
  chatList: [],
  chatListLoading: false,
  error: null,
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
      });
  },
});

export default chatSlice.reducer;
