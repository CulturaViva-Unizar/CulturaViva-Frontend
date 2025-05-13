import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { PaginatedEventsPage } from "../types/models";
import {
  ApiResponse,
  GetEventsRequest,
  GetEventsResponse,
} from "../../../types/api";
import { mapGetPaginatedEventsResponseToPaginatedEventsPage } from "../utils/mappers";

const getEvents = async (request: GetEventsRequest): Promise<PaginatedEventsPage> => {
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
  if (request.endDate) {
    params.append("endDate", request.endDate);
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

  const url = `/items/events?${params.toString()}`;
  const response: ApiResponse<GetEventsResponse> = await api.get(url);

  return mapGetPaginatedEventsResponseToPaginatedEventsPage(response.data);
};

export const useGetEvents = (request: GetEventsRequest) => {
  return useQuery<PaginatedEventsPage, Error>({
    queryKey: ["events", request],
    queryFn: () => getEvents(request),
  });
};
