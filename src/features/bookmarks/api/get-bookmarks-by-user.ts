import { useQuery } from "@tanstack/react-query";
import {
  ApiResponse,
  GetBookmarksByUserResponse,
  GetPaginatedEventsRequest,
} from "../../../types/api";
import { api } from "../../../lib/api-client";
import { BookmarksPage } from "../types/models";
import { mapGetBookmarksByUserResponseToBookmarksPage } from "../utils/mappers";

export const getBookmarksByUser = async (
  request: GetPaginatedEventsRequest
): Promise<BookmarksPage> => {
  const params = new URLSearchParams();

  if (request.eventType) {
    params.append("type", request.eventType);
  }
  if (request.eventName) {
    params.append("name", request.eventName);
  }
  if (request.eventDate) {
    params.append("date", request.eventDate.toISOString());
  }
  if (request.eventCategory) {
    params.append("category", request.eventCategory);
  }

  params.append("page", request.page.toString());
  params.append("limit", request.limit.toString());

  const url = `/users/${request.userId}/saved-events?${params.toString()}`;
  const response: ApiResponse<GetBookmarksByUserResponse> = await api.get(url);

  return mapGetBookmarksByUserResponseToBookmarksPage(response.data);
};

export const useGetBookmarksByUser = (request: GetPaginatedEventsRequest) => {
  return useQuery<BookmarksPage, Error>({
    queryKey: ["bookmarks", request],
    queryFn: () => getBookmarksByUser(request),
  });
};
