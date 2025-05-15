import { useQuery } from "@tanstack/react-query";
import { ApiResponse, GetEventsByCategoryResponse } from "../../../types/api";
import { api } from "../../../lib/api-client";
import { EventByCategory } from "../types/models";

export const getUpcomingEventsByCategoryAndUserAnalytics = async (
  id: string
): Promise<EventByCategory[]> => {
  const response: ApiResponse<GetEventsByCategoryResponse> = await api.get(
    `/statistics/users/${id}/upcoming-by-category`
  );

  return response.data;
};

export const useGetUpcomingEventsByCategoryAndUserAnalytics = (id: string) => {
  return useQuery<EventByCategory[], Error>({
    queryKey: ["analytics", "upcoming-events"],
    queryFn: () => getUpcomingEventsByCategoryAndUserAnalytics(id),
  });
};
