import { configureAuth } from "react-query-auth";
import { api } from "./api-client";
import {
  ApiResponse,
  CreateUserRequest,
  LoggedUser,
  LoginUserRequest,
  LoginUserResponse,
} from "../types/api";
import { User } from "../features/auth/types/models";

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

const registerFn = async (
  data: CreateUserRequest
): Promise<CreateUserRequest> => {
  const registerResponse: ApiResponse<CreateUserRequest> = await api.post(
    "/auth/register",
    data
  );

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
