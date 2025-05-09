import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { CulturalPlace } from "../types/models";
import { GetCulturalPlacesResponse } from "../../../types/api";
import { QueryConfig } from "../../../lib/react-query";

export const getCulturalPlaces = async (): Promise<CulturalPlace[]> => {
  const events: GetCulturalPlacesResponse = await api.get("/items/places");

  return events;
};

export const useGetCulturalPlaces = (config?: QueryConfig<typeof useQuery>) => {
  return useQuery<CulturalPlace[], Error>({
    queryKey: ["culturalPlaces"],
    queryFn: getCulturalPlaces,
    ...config,
  });
};
