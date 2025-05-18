import { GetPaginatedUsersResponse, UserResponse } from "../../../types/api";
import { PaginatedUsersPage, User } from "../types/models";

export const mapUserResponseToUser = (src: UserResponse): User => ({
  id: src.id,
  name: src.name,
  email: src.email,
  active: src.active,
  commentCount: src.commentCount,
  commentCountDisabled: src.commentCountDisabled,
  commentCountEnabled: src.commentCountEnabled,
});

export const mapGetPaginatedUsersResponseToPaginatedUsersPage = (
  src: GetPaginatedUsersResponse
): PaginatedUsersPage => {
  return {
    currentPage: src.currentPage,
    totalPages: src.totalPages,
    totalItems: src.totalItems,
    items: src.items.map(mapUserResponseToUser),
  };
};
