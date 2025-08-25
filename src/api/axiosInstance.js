import axios from "axios";
import { Cookies } from "react-cookie";

export default function axiosMainClient(timeout = 6000) {
  const axiosClient = axios.create({
    // TODO : add .env
    baseURL: import.meta.env.VITE_API_BE_URL || "http://localhost:3000/api/v1/",
    timeout,
    withCredentials: true,
  });

  axiosClient.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  axiosClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error(
        "Looks like there was a problem. Status Code: ",
        error?.response?.status,
      );
      return Promise.reject(error);
    },
  );

  return axiosClient;
}
