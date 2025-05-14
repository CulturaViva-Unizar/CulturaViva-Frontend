import { PostCreateChatResponse } from "../../../types/api";
import { CreatedChat } from "../types/models";

export const mapCreateChatResponseToCreatedChat = (src: PostCreateChatResponse): CreatedChat => ({
  id: src.id,
});