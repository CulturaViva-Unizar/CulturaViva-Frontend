import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { PaginatedCulturalPlacesPage } from "../types/models";
import {
  ApiResponse,
  GetCulturalPlacesRequest,
  GetPaginatedCulturalPlacesResponse,
} from "../../../types/api";
import {
  mapGetPaginatedCulturalPlacesResponseToPaginatedCulturalPlacesPage,
} from "../utils/mappers";

const getCulturalPlaces = async (
  request: GetCulturalPlacesRequest
): Promise<PaginatedCulturalPlacesPage> => {
  const params = new URLSearchParams();

  if (request.name) {
    params.append("name", request.name);
  }
  if (request.category) {
    params.append("category", request.category);
  }
  if (request.maxPrice) {
    params.append("maxPrice", request.maxPrice.toString());
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
  const response: ApiResponse<GetPaginatedCulturalPlacesResponse> =
    await api.get(url);

  return mapGetPaginatedCulturalPlacesResponseToPaginatedCulturalPlacesPage(
    response.data
  );
};

export const useGetCulturalPlaces = (request: GetCulturalPlacesRequest) => {
  return useQuery<PaginatedCulturalPlacesPage, Error>({
    queryKey: ["culturalPlaces", request],
    queryFn: () => getCulturalPlaces(request),
  });
};
