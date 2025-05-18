import { useQuery } from "@tanstack/react-query";
import {
  ApiResponse,
  GetPaginatedEventsResponse,
  GetSuggestedEventsRequest,
} from "../../../types/api";
import { api } from "../../../lib/api-client";
import { mapGetPaginatedEventsResponseToPaginatedEventsPage } from "../utils/mappers";
import { PaginatedEventsPage } from "../types/models";

const getSuggestedEvents = async (
  id: string,
  request: GetSuggestedEventsRequest
): Promise<PaginatedEventsPage> => {
  const params = new URLSearchParams();

  if (request.sort) {
    params.append("sort", request.sort)
  }
  if (request.order) {
    params.append("order", request.order)
  }

  params.append("type", request.type);
  params.append("page", request.page.toString());
  params.append("limit", request.limit.toString());

  const url = `/users/${id}/recommended-items?${params.toString()}`;
  const response: ApiResponse<GetPaginatedEventsResponse> = await api.get(url);

  return mapGetPaginatedEventsResponseToPaginatedEventsPage(response.data);
};

export const useGetSuggestedEvents = (id: string, request: GetSuggestedEventsRequest) => {
  return useQuery<PaginatedEventsPage, Error>({
    queryKey: ["recommendedEvents", request],
    queryFn: () => getSuggestedEvents(id, request),
    enabled: Boolean(id),
  });
};
