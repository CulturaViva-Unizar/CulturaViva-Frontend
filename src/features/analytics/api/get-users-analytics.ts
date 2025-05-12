import { useQuery } from "@tanstack/react-query";
import {
  ApiResponse,
  GetUsersAnalyticsRequest,
  GetUsersAnalyticsResponse,
} from "../../../types/api";
import { api } from "../../../lib/api-client";
import { Analytics } from "../types/models";
import { mapGetUsersAnalyticsResponseToAnalytics } from "../utils/mappers";

export const getUsersAnalytics = async (
  request: GetUsersAnalyticsRequest
): Promise<Analytics> => {
  const params = new URLSearchParams();

  if (request.type) {
    params.append("type", request.type);
  }

  const response: ApiResponse<GetUsersAnalyticsResponse> = await api.get(
    `/statistics/users?${params.toString()}`
  );

  return mapGetUsersAnalyticsResponseToAnalytics(response.data);
};

export const useGetUsersAnalytics = (request: GetUsersAnalyticsRequest) => {
  return useQuery<Analytics, Error>({
    queryKey: ["analytics", "user", request],
    queryFn: () => getUsersAnalytics(request),
  });
};
