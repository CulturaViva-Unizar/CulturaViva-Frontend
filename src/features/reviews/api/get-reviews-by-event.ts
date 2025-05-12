import { useQuery } from "@tanstack/react-query";
import { ApiResponse, GetReviewsByEventResponse } from "../../../types/api";
import { api } from "../../../lib/api-client";
import { Review } from "../types/models";
import { mapReviewsResponseToReview } from "../utils/mappers";

export const getReviewsByEvent = async (id: string): Promise<Review[]> => {
  const response: ApiResponse<GetReviewsByEventResponse> = await api.get(
    `/items/events/${id}/comments`
  );

  const { data: reviews = [] } = response;

  return reviews.map(mapReviewsResponseToReview);
};

export const useGetReviewsByEvent = (id: string) => {
  return useQuery<Review[], Error>({
    queryKey: ["reviews", id],
    queryFn: () => getReviewsByEvent(id),
  });
};
