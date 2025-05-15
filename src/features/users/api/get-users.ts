import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import {
  ApiResponse,
  GetUsersRequest,
  GetPaginatedUsersResponse,
} from "../../../types/api";
import { PaginatedUsersPage } from "../types/models";
import { mapGetPaginatedUsersResponseToPaginatedUsersPage } from "../utils/mapper";

const getUsers = async (
  request: GetUsersRequest
): Promise<PaginatedUsersPage> => {
  const params = new URLSearchParams();

  if (request.name) {
    params.append("name", request.name);
  }
  if (request.userType) {
    const userType =
      request.userType.charAt(0).toUpperCase() + request.userType.slice(1);
    params.append("userType", userType);
  }
  if (request.sort) {
    params.append("sort", request.sort);
  }
  if (request.order) {
    params.append("order", request.order);
  }

  params.append("page", request.page.toString());
  params.append("limit", request.limit.toString());

  const url = `/users?${params.toString()}`;
  const response: ApiResponse<GetPaginatedUsersResponse> = await api.get(url);

  return mapGetPaginatedUsersResponseToPaginatedUsersPage(response.data);
};

export const useGetUsers = (request: GetUsersRequest) => {
  return useQuery<PaginatedUsersPage, Error>({
    queryKey: ["users", request],
    queryFn: () => getUsers(request),
  });
};
