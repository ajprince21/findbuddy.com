import { API_ENDPOINTS } from "./constants.api";
import axiosInstance from "./axiosInstance";
const getUserChatList = () => {
  return axiosInstance.get(API_ENDPOINTS.CHAT_LIST);
};

const fetchMessages = (queryParams) => {
  const { user_id, skip, limit } = queryParams;
  const params = {
    skip,
    limit,
  };
  const url = `${API_ENDPOINTS.GET_MESSAGES}/${user_id}`;
  return axiosInstance.get(url, { params });
};

const fetchMessagesCount = (queryParams) => {
  const { user_id } = queryParams;
  const url = `${API_ENDPOINTS.GET_MESSAGES_COUNT}/${user_id}`;
  return axiosInstance.get(url);
};

const sendMessages = (params) => {
  const url = `${API_ENDPOINTS.SEND_MESSAGE}`;
  return axiosInstance.post(url, params);
};

export default {
  getUserChatList,
  fetchMessages,
  sendMessages,
  fetchMessagesCount,
};
