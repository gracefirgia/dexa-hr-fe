import axios from "axios";
import { Cookies } from "react-cookie";

export default function axiosMainClient(timeout = 6000) {
  const axiosClient = axios.create({
    // TODO : add .env
    baseURL: "http://localhost:3000/api/v1/",
    timeout,
    withCredentials: false,
  });

  axiosClient.interceptors.request.use(
    (config) => {
      const cookies = new Cookies();
      const token = cookies.get("jwt_token");

      config.headers = config.headers || {};

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
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
