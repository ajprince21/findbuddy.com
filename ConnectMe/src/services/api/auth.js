import { API_ENDPOINTS } from "./constants.api";
import axios from "axios";

const registerUser = (params) => {
  return axios.post(API_ENDPOINTS.USER_REGISTER, params);
};

const userLogin = (params) => {
  return axios.post(API_ENDPOINTS.USER_LOGIN, params);
};

export default {
  registerUser,
  userLogin,
};
