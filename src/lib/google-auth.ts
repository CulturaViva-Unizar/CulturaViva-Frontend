import { useMutation } from "@tanstack/react-query";
import { api } from "./api-client";
import {
  LoginUserResponse,
  LoggedUser,
} from "../types/api";

type GoogleLoginOptions = {
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
};

const googleLoginFn = async (token: string): Promise<LoggedUser> => {
  const loginResponse = await api.post<LoginUserResponse>("/auth/google", {
    access_token: token,
  });

  const { accessToken, user } = loginResponse.data;
  localStorage.setItem("token", accessToken);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};

export function useGoogleLoginBackend(options?: GoogleLoginOptions): {
  mutate: (accessToken: string) => void;
  isLoading: boolean;
  error: unknown;
} {
  const mutation = useMutation<LoggedUser, unknown, string>(googleLoginFn, {
    onSuccess: () => {
      options?.onSuccess?.();
    },
    onError: (err) => {
      options?.onError?.(err);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
}
