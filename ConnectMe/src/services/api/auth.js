import { API_ENDPOINTS } from "./constants.api";
import axios from "axios";
import axiosInstance from "./axiosInstance";

const registerUser = (params) => {
  return axiosInstance.post(API_ENDPOINTS.USER_REGISTER, params);
};

const userLogin = (params) => {
  return axiosInstance.post(API_ENDPOINTS.USER_LOGIN, params);
};

export default {
  registerUser,
  userLogin,
};
