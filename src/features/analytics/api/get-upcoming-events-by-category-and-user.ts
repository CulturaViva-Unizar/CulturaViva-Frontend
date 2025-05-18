import { useQuery } from "@tanstack/react-query";
import { ApiResponse, GetItemsByCategoryResponse } from "../../../types/api";
import { api } from "../../../lib/api-client";
import { ItemByCategory } from "../types/models";

export const getUpcomingEventsByCategoryAndUserAnalytics = async (
  id: string
): Promise<ItemByCategory[]> => {
  const response: ApiResponse<GetItemsByCategoryResponse> = await api.get(
    `/statistics/users/${id}/upcoming-by-category`
  );

  return response.data;
};

export const useGetUpcomingEventsByCategoryAndUserAnalytics = (id: string) => {
  return useQuery<ItemByCategory[], Error>({
    queryKey: ["analytics", "upcoming-events"],
    queryFn: () => getUpcomingEventsByCategoryAndUserAnalytics(id),
  });
};
