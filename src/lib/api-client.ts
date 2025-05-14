import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { paths } from "../config/paths";
import { TokenService } from "./token-service";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Decodifica el JWT y devuelve la fecha de expiración en milisegundos
function getTokenExpiration(token: string): number {
  const { exp } = jwtDecode<{ exp: number }>(token);
  return exp * 1000;
}

function isTokenExpired(token: string): boolean {
  return Date.now() > getTokenExpiration(token);
}

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers ?? {};
    config.headers.Accept = "application/json";

    const token = TokenService.getAccessToken();
    if (token) {
      if (isTokenExpired(token)) {
        // Token expirado: limpia y redirige a unauthorized
        TokenService.clear();
        window.location.href = paths.auth.unauthorized.getHref();
        throw new AxiosError("Token expirado", "401", config);
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response.data,
  (error: AxiosError) => {
    const status = error.response?.status;
    const unauthorizedPath = paths.auth.unauthorized.getHref();
    if (status === 401 && window.location.pathname !== unauthorizedPath) {
      TokenService.clear();
      window.location.href = unauthorizedPath;
    }
    return Promise.reject(error);
  }
);