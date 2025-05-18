import { useQuery } from "@tanstack/react-query";
import {
  ApiResponse,
  GetBookmarksByUserResponse,
  GetPaginatedBookmarksRequest,
} from "../../../types/api";
import { api } from "../../../lib/api-client";
import { BookmarksPage } from "../types/models";
import { mapGetBookmarksByUserResponseToBookmarksPage } from "../utils/mappers";
import { Items } from "../../../shared/types/enums";

export const getBookmarksByUser = async (
  userId: string,
  request: GetPaginatedBookmarksRequest
): Promise<BookmarksPage> => {
  const params = new URLSearchParams();

  if (request.itemType) {
    const itemType = request.itemType == Items.Evento ? "Event" : "Place";
    params.append("itemType", itemType);
  }
  if (request.name) {
    params.append("name", request.name);
  }
  if (request.startDate) {
    params.append("startDate", request.startDate);
  }
  if (request.endDate) {
    params.append("endDate", request.endDate);
  }
  if (request.category) {
    params.append("category", request.category);
  }
  if (request.sort) {
    params.append("sort", request.sort);
  }
  if (request.order) {
    params.append("order", request.order);
  }

  params.append("page", request.page.toString());
  params.append("limit", request.limit.toString());

  const url = `/users/${userId}/saved-events?${params.toString()}`;
  const response: ApiResponse<GetBookmarksByUserResponse> = await api.get(url);

  return mapGetBookmarksByUserResponseToBookmarksPage(response.data);
};

export const useGetBookmarksByUser = (
  userId: string,
  request: GetPaginatedBookmarksRequest
) => {
  return useQuery<BookmarksPage, Error>({
    queryKey: ["bookmarks", userId, request],
    queryFn: () => getBookmarksByUser(userId, request),
    enabled: Boolean(userId),
  });
};
