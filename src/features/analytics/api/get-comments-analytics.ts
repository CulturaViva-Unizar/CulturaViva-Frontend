import { useQuery } from "@tanstack/react-query";
import {
  ApiResponse,
  GetCommentsAnalyticsResponse,
  GetTimeAnalyticsRequest,
} from "../../../types/api";
import { api } from "../../../lib/api-client";
import { CommentsAnalytics } from "../types/models";

export const getCommentsAnalytics = async (
  request: GetTimeAnalyticsRequest
): Promise<CommentsAnalytics> => {
  const response: ApiResponse<GetCommentsAnalyticsResponse> = await api.get(
    `/statistics/comments?range=${request.range}`
  );

  return response.data[0];
};

export const useGetCommentsAnalytics = (request: GetTimeAnalyticsRequest) => {
  return useQuery<CommentsAnalytics, Error>({
    queryKey: ["analytics", "comments", request],
    queryFn: () => getCommentsAnalytics(request),
  });
};
