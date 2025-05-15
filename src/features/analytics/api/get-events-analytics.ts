import { useQuery } from "@tanstack/react-query";
import {
  ApiResponse,
  GetEventsAnalyticsRequest,
  GetEventsAnalyticsResponse,
} from "../../../types/api";
import { api } from "../../../lib/api-client";

export const getEventsAnalytics = async (
  request: GetEventsAnalyticsRequest
): Promise<number> => {
  const params = new URLSearchParams();

  if (request.category) {
    params.append("category", request.category);
  }

  const response: ApiResponse<GetEventsAnalyticsResponse> = await api.get(
    `/statistics/events?${params.toString()}`
  );

  return response.data.count;
};

export const useGetEventsAnalytics = (request: GetEventsAnalyticsRequest) => {
  return useQuery<number, Error>({
    queryKey: ["analytics", "events", request],
    queryFn: () => getEventsAnalytics(request),
  });
};
