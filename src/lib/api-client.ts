import axios, { InternalAxiosRequestConfig } from "axios";
import { paths } from "../config/paths";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  config.headers = config.headers ?? {};

  config.headers.Accept = "application/json";

  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname != paths.auth.login.getHref()) {
      window.location.href = paths.auth.unauthorized.getHref();
    }

    return Promise.reject(error);
  }
);
