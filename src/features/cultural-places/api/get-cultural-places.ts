import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { CulturalPlace } from "../types/models";
import {
  ApiResponse,
  GetCulturalPlacesRequest,
  GetCulturalPlacesResponse,
} from "../../../types/api";
import { mapCulturalPlaceResponseToCulturalPlace } from "../utils/mappers";

const getCulturalPlaces = async (
  request: GetCulturalPlacesRequest
): Promise<CulturalPlace[]> => {
  const params = new URLSearchParams();

  if (request.name) {
    params.append("name", request.name);
  }
  if (request.category) {
    params.append("category", request.category);
  }
  if (request.startDate) {
    params.append("startDate", request.startDate);
  }
  if (request.maxPrice) {
    params.append("price", request.maxPrice.toString());
  }
  if (request.sort) {
    params.append("sort", request.sort);
  }
  if (request.order) {
    params.append("order", request.order);
  }

  params.append("page", request.page.toString());
  params.append("limit", request.limit.toString());

  const url = `/items/places?${params.toString()}`;
  const response: ApiResponse<GetCulturalPlacesResponse> = await api.get(url);

  return response.data.items.map(mapCulturalPlaceResponseToCulturalPlace);
};

export const useGetCulturalPlaces = (request: GetCulturalPlacesRequest) => {
  return useQuery<CulturalPlace[], Error>({
    queryKey: ["culturalPlaces", request],
    queryFn: () => getCulturalPlaces(request),
  });
};
