import Config from "../config/default.env";
const { MS_MY_BUDDY_PUBLIC } = Config;

export const API_ENDPOINTS = {
  USER_REGISTER: `${MS_MY_BUDDY_PUBLIC}/api/auth/register`,
  USER_LOGIN: `${MS_MY_BUDDY_PUBLIC}/api/auth/login`,
  CHAT_LIST: `${MS_MY_BUDDY_PUBLIC}/api/users`,
  SEND_MESSAGE: `${MS_MY_BUDDY_PUBLIC}/api/messages/send-message`,
  GET_MESSAGES: `${MS_MY_BUDDY_PUBLIC}/api/messages`,
  GET_MESSAGES_COUNT: `${MS_MY_BUDDY_PUBLIC}/api/messages/count`,
};
