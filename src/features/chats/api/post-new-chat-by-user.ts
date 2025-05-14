import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { ApiResponse, PostCreateChatRequest, PostCreateChatResponse } from "../../../types/api";
import { mapCreateChatResponseToCreatedChat } from "../utils/mappers";

const postNewChatByUser = async (data: PostCreateChatRequest) => {
  const response: ApiResponse<PostCreateChatResponse> = await api.post("/chats", data);

  const { data: chat } = response;

  return mapCreateChatResponseToCreatedChat(chat);
};

export const usePostNewChatByUser = (userId: string) => {
  const qc = useQueryClient();
  
  return useMutation({
    mutationFn: postNewChatByUser,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['chats', userId]});
    },
  });
};
