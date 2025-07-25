import { useQuery } from "@tanstack/react-query";
import { ApiResponse, GetItemsByCategoryResponse } from "../../../types/api";
import { api } from "../../../lib/api-client";
import { ItemByCategory } from "../types/models";

export const getPopularEventsByCategoryAnalytics = async (): Promise<
  ItemByCategory[]
> => {
  const response: ApiResponse<GetItemsByCategoryResponse> = await api.get(
    "/statistics/popular-by-category?itemType=Event"
  );

  return response.data;
};

export const useGetPopularEventsByCategoryAnalytics = () => {
  return useQuery<ItemByCategory[], Error>({
    queryKey: ["analytics", "popular-events"],
    queryFn: getPopularEventsByCategoryAnalytics,
  });
};
