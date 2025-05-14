import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { ApiResponse, GetCulturalPlaceByIdResponse } from "../../../types/api";
import { CulturalPlace } from "../types/models";
import { mapCulturalPlaceResponseToCulturalPlace } from "../utils/mappers";

const getCulturalPlaceById = async (id: string): Promise<CulturalPlace> => {
  const response: ApiResponse<GetCulturalPlaceByIdResponse> = await api.get(
    `/items/places/${id}`
  );

  const { data: culturalPlace } = response;

  return mapCulturalPlaceResponseToCulturalPlace(culturalPlace);
};

export const useGetCulturalPlaceById = (id: string) => {
  return useQuery<CulturalPlace, Error>({
    queryKey: ["culturalPlace", id],
    queryFn: () => getCulturalPlaceById(id),
  });
};
