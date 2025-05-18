import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { ApiResponse, LoggedUser, LoginUserResponse } from "../../../types/api";
import { TokenService } from "../../../lib/token-service";

async function loginGoogle(): Promise<LoggedUser> {
  window.location.href = import.meta.env.VITE_API_URL + "/auth/google";
  
  const response: ApiResponse<LoginUserResponse> = await api.get(
    `/auth/google`
  );
  const payload = response.data;

  TokenService.setAccessToken(payload.accessToken);
  TokenService.saveUser(payload.user);

  return payload.user;
}

export function useLoginGoogle(
  options?: UseMutationOptions<
    LoggedUser, // <- TData
    unknown, // TError
    void, // TVariables
    unknown // TContext
  >
) {
  return useMutation<LoggedUser, unknown, void>({
    mutationFn: loginGoogle,
    ...options,
  });
}
