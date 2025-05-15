import { useQuery } from "@tanstack/react-query";
import { ApiResponse, GetEventsByCategoryResponse } from "../../../types/api";
import { api } from "../../../lib/api-client";
import { EventByCategory } from "../types/models";

export const getPopularEventsByCategoryAnalytics = async (): Promise<
  EventByCategory[]
> => {
  const response: ApiResponse<GetEventsByCategoryResponse> = await api.get(
    "/statistics/popular-by-category"
  );

  return response.data;
};

export const useGetPopularEventsByCategoryAnalytics = () => {
  return useQuery<EventByCategory[], Error>({
    queryKey: ["analytics", "popular-events"],
    queryFn: getPopularEventsByCategoryAnalytics,
  });
};
