import { useQuery } from "@tanstack/react-query";
import { ApiResponse, GetItemsByCategoryResponse } from "../../../types/api";
import { api } from "../../../lib/api-client";
import { ItemByCategory } from "../types/models";

export const getAssistedEventsByCategoryAndUserAnalytics = async (
  id: string
): Promise<ItemByCategory[]> => {
  const response: ApiResponse<GetItemsByCategoryResponse> = await api.get(
    `/statistics/users/${id}/attended-by-category`
  );

  return response.data;
};

export const useGetAssistedEventsByCategoryAndUserAnalytics = (id: string) => {
  return useQuery<ItemByCategory[], Error>({
    queryKey: ["analytics", "assisted-events"],
    queryFn: () => getAssistedEventsByCategoryAndUserAnalytics(id),
  });
};
