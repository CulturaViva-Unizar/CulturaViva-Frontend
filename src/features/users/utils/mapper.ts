import { GetPaginatedUsersResponse, UserResponse } from "../../../types/api";
import { PaginatedUsersPage, User } from "../types/models";

export const mapUserResponseToUser = (src: UserResponse): User => ({
  id: src._id,
  name: src.name,
  email: src.email,
  active: src.active,
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
