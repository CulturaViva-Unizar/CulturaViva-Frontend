import { useQuery } from "@tanstack/react-query";
import {
  ApiResponse,
  GetRepliesRequest,
  GetRepliesResponse,
} from "../../../types/api";
import { api } from "../../../lib/api-client";
import { Reply } from "../types/models";
import { mapReviewsResponseToReply } from "../utils/mappers";

export const getRepliesByEvent = async (
  request: GetRepliesRequest
): Promise<Reply[]> => {
  const response: ApiResponse<GetRepliesResponse> = await api.get(
    `/items/events/${request.itemId}/comments/${request.commentId}/responses`
  );

  const { data: replies = [] } = response;

  return replies.map(mapReviewsResponseToReply);
};

export const useGetRepliesByEvent = (request: GetRepliesRequest) => {
  return useQuery<Reply[], Error>({
    queryKey: ["replies", request.commentId],
    queryFn: () => getRepliesByEvent(request),
  });
};
