import { useQuery } from "@tanstack/react-query";
import {
  ApiResponse,
  GetPaginatedCulturalPlacesResponse,
  GetPopularCulturalPlacesRequest,
} from "../../../types/api";
import { api } from "../../../lib/api-client";
import { PaginatedCulturalPlacesPage } from "../types/models";
import { mapGetPaginatedCulturalPlacesResponseToPaginatedCulturalPlacesPage } from "../utils/mappers";

const getPopularCulturalPlaces = async (
  request: GetPopularCulturalPlacesRequest
): Promise<PaginatedCulturalPlacesPage> => {
  const params = new URLSearchParams();

  if (request.category) {
    params.append("category", request.category);
  }

  params.append("itemType", "Place");
  params.append("page", request.page.toString());
  params.append("limit", request.limit.toString());

  const url = `/users/popular-events?${params.toString()}`;
  const response: ApiResponse<GetPaginatedCulturalPlacesResponse> =
    await api.get(url);

  return mapGetPaginatedCulturalPlacesResponseToPaginatedCulturalPlacesPage(
    response.data
  );
};

export const useGetPopularCulturalPlaces = (
  request: GetPopularCulturalPlacesRequest
) => {
  return useQuery<PaginatedCulturalPlacesPage, Error>({
    queryKey: ["popularCulturalPlaces", request],
    queryFn: () => getPopularCulturalPlaces(request),
  });
};
