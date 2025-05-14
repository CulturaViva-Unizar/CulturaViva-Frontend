import { configureAuth } from "react-query-auth";
import { api } from "./api-client";
import { TokenService } from "./token-service";
import {
  ApiResponse,
  CreateUserRequest,
  CreateUserRespose,
  LoggedUser,
  LoginUserRequest,
  LoginUserResponse,
} from "../types/api";

const userFn = async (): Promise<LoggedUser | null> => {
  return TokenService.getUser<LoggedUser>();
};

const logoutFn = async (): Promise<void> => {
  TokenService.clear();
};

const loginFn = async (data: LoginUserRequest): Promise<LoggedUser> => {
  const response: ApiResponse<LoginUserResponse> = await api.post("/auth/login", data);
  const { accessToken, user } = response.data;

  TokenService.setAccessToken(accessToken);
  TokenService.saveUser(user);

  return user;
};

const registerFn = async (data: CreateUserRequest): Promise<LoggedUser> => {
  const response: ApiResponse<CreateUserRespose> = await api.post("/auth/register", data);
  return response.data.user;
};
const authConfig = { userFn, loginFn, registerFn, logoutFn };
export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);
