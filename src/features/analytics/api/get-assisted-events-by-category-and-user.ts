import { useQuery } from "@tanstack/react-query";
import { ApiResponse, GetEventsByCategoryResponse } from "../../../types/api";
import { api } from "../../../lib/api-client";
import { EventByCategory } from "../types/models";

export const getAssistedEventsByCategoryAndUserAnalytics = async (
  id: string
): Promise<EventByCategory[]> => {
  const response: ApiResponse<GetEventsByCategoryResponse> = await api.get(
    `/statistics/users/${id}/attended-by-category`
  );

  return response.data;
};

export const useGetAssistedEventsByCategoryAndUserAnalytics = (id: string) => {
  return useQuery<EventByCategory[], Error>({
    queryKey: ["analytics", "assisted-events"],
    queryFn: () => getAssistedEventsByCategoryAndUserAnalytics(id),
  });
};
