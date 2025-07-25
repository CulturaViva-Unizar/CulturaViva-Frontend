import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { ApiResponse, GetPaginatedEventsResponse, GetPaginatedEventsRequest } from "../../../types/api";
import { PaginatedEventsPage } from "../types/models";
import { mapGetPaginatedEventsResponseToPaginatedEventsPage } from "../utils/mappers";

export const getAssistedEventsByUser = async (
  request: GetPaginatedEventsRequest
): Promise<PaginatedEventsPage> => {
  const params = new URLSearchParams();

  if (request.eventName) {
    params.append("name", request.eventName);
  }
  if (request.eventDate) {
    params.append("date", request.eventDate);
  }
  if (request.eventCategory) {
    params.append("category", request.eventCategory);
  }

  params.append("page", request.page.toString());
  params.append("limit", request.limit.toString());

  const url = `/users/${request.userId}/attended-events?${params.toString()}`;
  const response: ApiResponse<GetPaginatedEventsResponse> = await api.get(url);

  return mapGetPaginatedEventsResponseToPaginatedEventsPage(response.data);
};

export const useGetAssistedEventsByUser = (request: GetPaginatedEventsRequest) => {
  return useQuery<PaginatedEventsPage, Error>({
    queryKey: ["assistedEvents", request],
    queryFn: () => getAssistedEventsByUser(request),
  });
};
