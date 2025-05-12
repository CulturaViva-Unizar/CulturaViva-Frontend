import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { ApiResponse, GetMessagesByChatResponse } from "../../../types/api";
import { ChatMessage } from "../types/models";

const getMessagesByChat = async (id: string): Promise<ChatMessage[]> => {
  const response: ApiResponse<GetMessagesByChatResponse> = await api.get(
    `/chats/${id}/messages`
  );

  const { data: chats = [] } = response;

  return chats;
};

export const useGetMessagesByChat = (id: string) => {
  return useQuery<ChatMessage[], Error>({
    queryKey: ["messages", id],
    queryFn: () => getMessagesByChat(id),
    enabled: Boolean(id)
  });
};
