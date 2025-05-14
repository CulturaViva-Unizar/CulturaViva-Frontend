import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../../types/api";
import { api } from "../../../lib/api-client";

const getEventCategories = async (): Promise<string[]> => {
  const response: ApiResponse<string[]> = await api.get(
    "/items/events/categories"
  );

  return response.data;
};

export const useGetEventCategories = () => {
  return useQuery<string[], Error>({
    queryKey: ["categories", "events"],
    queryFn: () => getEventCategories(),
  });
};
