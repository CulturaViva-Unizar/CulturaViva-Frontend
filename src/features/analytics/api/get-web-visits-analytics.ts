import { useQuery } from "@tanstack/react-query";
import {
  ApiResponse,
  GetTimeAnalyticsRequest,
  GetDisabledUsersAnalyticsResponse,
} from "../../../types/api";
import { api } from "../../../lib/api-client";
import { TimeAnalytics } from "../types/models";
import { mapTimeAnalyticsResponseToTimeAnalytics } from "../utils/mappers";

export const getWebVisitsAnalytics = async (
  request: GetTimeAnalyticsRequest
): Promise<TimeAnalytics[]> => {
  const response: ApiResponse<GetDisabledUsersAnalyticsResponse> =
    await api.get(`/statistics/visits?range=${request.range}`);

  return response.data.stats.map(mapTimeAnalyticsResponseToTimeAnalytics);
};

export const useGetWebVisitsAnalytics = (
  request: GetTimeAnalyticsRequest
) => {
  return useQuery<TimeAnalytics[], Error>({
    queryKey: ["analytics", "webVisits", request],
    queryFn: () => getWebVisitsAnalytics(request),
  });
};
