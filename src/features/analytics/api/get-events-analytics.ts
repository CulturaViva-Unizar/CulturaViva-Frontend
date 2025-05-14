import { useQuery } from "@tanstack/react-query";
import {
  ApiResponse,
  GetEventsAnalyticsRequest,
  GetEventsAnalyticsResponse,
} from "../../../types/api";
import { api } from "../../../lib/api-client";
import { Analytics } from "../types/models";
import { mapGetEventsAnalyticsResponseToAnalytics } from "../utils/mappers";

export const getEventsAnalytics = async (
  request: GetEventsAnalyticsRequest
): Promise<Analytics> => {
  const params = new URLSearchParams();

  if (request.category) {
    params.append("category", request.category);
  }

  const response: ApiResponse<GetEventsAnalyticsResponse> = await api.get(
    `/statistics/events?${params.toString()}`
  );

  return mapGetEventsAnalyticsResponseToAnalytics(response.data);
};

export const useGetEventsAnalytics = (request: GetEventsAnalyticsRequest) => {
  return useQuery<Analytics, Error>({
    queryKey: ["analytics", "events", request],
    queryFn: () => getEventsAnalytics(request),
  });
};
