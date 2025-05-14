import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../../types/api";
import { api } from "../../../lib/api-client";

const getCulturalPlaceCategories = async (): Promise<string[]> => {
  const response: ApiResponse<string[]> = await api.get(
    "/items/places/categories"
  );

  return response.data;
};

export const useGetCulturalPlaceCategories = () => {
  return useQuery<string[], Error>({
    queryKey: ["categories", "culturalPlaces"],
    queryFn: () => getCulturalPlaceCategories(),
  });
};
