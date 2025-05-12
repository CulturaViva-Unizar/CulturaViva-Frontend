import { useQuery } from "@tanstack/react-query";
import {
  ApiResponse,
  GetPaginatedEventsResponse,
  GetPopularEventsRequest,
} from "../../../types/api";
import { api } from "../../../lib/api-client";
import { mapGetPaginatedEventsResponseToPaginatedEventsPage } from "../utils/mappers";
import { PaginatedEventsPage } from "../types/models";

const getPopularEvents = async (
  request: GetPopularEventsRequest
): Promise<PaginatedEventsPage> => {
  const params = new URLSearchParams();

  if (request.category) {
    params.append("category", request.category);
  }

  params.append("page", request.page.toString());
  params.append("limit", request.limit.toString());

  const url = `/users/popular-events?${params.toString()}`;
  const response: ApiResponse<GetPaginatedEventsResponse> = await api.get(url);

  return mapGetPaginatedEventsResponseToPaginatedEventsPage(response.data);
};

export const useGetPopularEvents = (request: GetPopularEventsRequest) => {
  return useQuery<PaginatedEventsPage, Error>({
    queryKey: ["popularEvents", request],
    queryFn: () => getPopularEvents(request),
  });
};
