import { API_CHAT_LIST } from "./constants.api";
import axios from "axios";

const getUserChatList = () => {
  return axios.get(API_CHAT_LIST);
};

export default {
  getUserChatList,
};
