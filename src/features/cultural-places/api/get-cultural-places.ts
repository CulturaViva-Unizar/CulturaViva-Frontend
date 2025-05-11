import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { CulturalPlace } from "../types/models";
import { ApiResponse, GetCulturalPlacesResponse } from "../../../types/api";
import { mapCulturalPlaceResponseToCulturalPlace } from "../utils/mappers";

const getCulturalPlaces = async (): Promise<CulturalPlace[]> => {
  const response: ApiResponse<GetCulturalPlacesResponse> = await api.get(
    "/items/places"
  );

  const { data: culturalPlaces = [] } = response;

  return culturalPlaces.map(mapCulturalPlaceResponseToCulturalPlace);
};

export const useGetCulturalPlaces = () => {
  return useQuery<CulturalPlace[], Error>({
    queryKey: ["culturalPlaces"],
    queryFn: getCulturalPlaces,
  });
};
