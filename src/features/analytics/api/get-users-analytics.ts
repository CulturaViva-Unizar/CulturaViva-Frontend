import { useQuery } from "@tanstack/react-query";
import {
  ApiResponse,
  GetUsersAnalyticsRequest,
  GetUsersAnalyticsResponse,
} from "../../../types/api";
import { api } from "../../../lib/api-client";

export const getUsersAnalytics = async (
  request: GetUsersAnalyticsRequest
): Promise<number> => {
  const params = new URLSearchParams();

  if (request.type) {
    params.append("type", request.type);
  }

  const response: ApiResponse<GetUsersAnalyticsResponse> = await api.get(
    `/statistics/users?${params.toString()}`
  );

  return response.data.count;
};

export const useGetUsersAnalytics = (request: GetUsersAnalyticsRequest) => {
  return useQuery<number, Error>({
    queryKey: ["analytics", "users", request],
    queryFn: () => getUsersAnalytics(request),
  });
};
