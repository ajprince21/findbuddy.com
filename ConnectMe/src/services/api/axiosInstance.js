import axios from "axios";
import * as Device from "expo-device";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzEwN2M1NjcyNDE1NTFjMTAwNGQwMCIsImlhdCI6MTcyNDU5NjQ2OSwiZXhwIjoxNzI0NjAwMDY5fQ.j-okKFnP2ZgT49sHs1Ha5el8z0T0CWMDOAq7xA8HUoE";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const deviceDetails = {
      deviceId: Device.deviceId,
      deviceName: Device.modelName,
      systemName: Device.osName,
      systemVersion: Device.osVersion,
      appVersion: "1.0.0",
      brand: Device.brand,
    };

    config.headers["X-Device-Details"] = JSON.stringify(deviceDetails);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
