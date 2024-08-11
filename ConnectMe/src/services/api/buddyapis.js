import { API_USER_REGISTER, API_USER_LOGIN } from "./constants.api";
import axios from "axios";

const registerUser = (params) => {
  return axios.post(API_USER_REGISTER, params);
};

const userLogin = (params) => {
  return axios.post(API_USER_LOGIN, params);
};

export default {
  registerUser,
  userLogin,
};
