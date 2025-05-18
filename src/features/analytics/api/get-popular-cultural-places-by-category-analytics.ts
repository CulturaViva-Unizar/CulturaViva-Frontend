import { useQuery } from "@tanstack/react-query";
import { ApiResponse, GetItemsByCategoryResponse } from "../../../types/api";
import { api } from "../../../lib/api-client";
import { ItemByCategory } from "../types/models";

export const getPopularCuturalPlacesByCategoryAnalytics = async (): Promise<
  ItemByCategory[]
> => {
  const response: ApiResponse<GetItemsByCategoryResponse> = await api.get(
    "/statistics/popular-by-category?itemType=Place"
  );

  return response.data;
};

export const useGetPopularCulturalPlacesByCategoryAnalytics = () => {
  return useQuery<ItemByCategory[], Error>({
    queryKey: ["analytics", "popular-cultural-places"],
    queryFn: getPopularCuturalPlacesByCategoryAnalytics,
  });
};
