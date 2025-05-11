import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { ApiResponse, GetChatsByUserResponse } from "../../../types/api";
import { Chat } from "../types/models";

const getChatsByUser = async (id: string): Promise<Chat[]> => {
  const response: ApiResponse<GetChatsByUserResponse> = await api.get(
    `/users/${id}/chats`
  );

  const { data: chats = [] } = response;

  return chats;
};

export const useGetChatsByUser = (id: string) => {
  return useQuery<Chat[], Error>({
    queryKey: ["chats", id],
    queryFn: () => getChatsByUser(id),
  });
};
