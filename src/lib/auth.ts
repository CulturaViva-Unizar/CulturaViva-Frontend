import { configureAuth } from "react-query-auth";
import { api } from "./api-client";
import {
  ApiResponse,
  CreateUserRequest,
  CreateUserRespose,
  LoggedUser,
  LoginUserRequest,
  LoginUserResponse,
} from "../types/api";

const userFn = async (): Promise<LoggedUser | null> => {
  const userJson = localStorage.getItem("user");
  if (!userJson) {
    return null;
  }

  return JSON.parse(userJson) as LoggedUser;
};

const logoutFn = async (): Promise<void> => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const loginFn = async (data: LoginUserRequest): Promise<LoggedUser> => {
  const loginResponse: ApiResponse<LoginUserResponse> = await api.post(
    "/auth/login",
    data
  );

  localStorage.setItem("token", loginResponse.data.accessToken);
  localStorage.setItem("user", JSON.stringify(loginResponse.data.user));

  return loginResponse.data.user;
};

const registerFn = async (data: CreateUserRequest): Promise<CreateUserRespose> => {
  const registerResponse: ApiResponse<CreateUserRespose> = await api.post("/auth/register", data);

  return registerResponse.data;
};

const authConfig = {
  userFn,
  loginFn,
  registerFn,
  logoutFn,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);
