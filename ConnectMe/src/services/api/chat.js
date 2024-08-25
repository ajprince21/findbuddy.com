import { API_ENDPOINTS } from "./constants.api";
import axios from "axios";
import axiosInstance from "./axiosInstance";
const getUserChatList = () => {
  return axiosInstance.get(API_ENDPOINTS.CHAT_LIST);
};

const fetchMessages = (user_id) => {
  const url = `${API_ENDPOINTS.GET_MESSAGES}/${user_id}`;
  return axiosInstance.get(url);
};

export default {
  getUserChatList,
  fetchMessages,
};
