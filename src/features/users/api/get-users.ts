import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import {
  ApiResponse,
  GetUsersRequest,
  GetUsersResponse,
} from "../../../types/api";
import { User } from "../types/models";
import { mapUserResponseToUser } from "../utils/mapper";

const getUsers = async (request: GetUsersRequest): Promise<User[]> => {
  const params = new URLSearchParams();

  if (request.name) {
    params.append("name", request.name);
  }
  if (request.type) {
    params.append("type", request.type);
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
  const response: ApiResponse<GetUsersResponse> = await api.get("/users");

  return response.data.map(mapUserResponseToUser);
};

export const useGetUsers = (request: GetUsersRequest) => {
  return useQuery<User[], Error>({
    queryKey: ["users", request],
    queryFn: () => getUsers(request),
  });
};
