import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ApiResponse, GetReviewsByUserResponse } from "../../../types/api";
import { api } from "../../../lib/api-client";
import { Review } from "../types/models";
import { mapReviewsResponseToReview } from "../utils/mappers";

export const getReviewsByUser = async (id: string): Promise<Review[]> => {
  const response: ApiResponse<GetReviewsByUserResponse> = await api.get(
    `/users/${id}/comments`
  );

  const { data: reviews = [] } = response;

  return reviews.map(mapReviewsResponseToReview);
};

export const useGetReviewsByUser = (
  id: string,
  options?: Omit<UseQueryOptions<Review[], Error>, "queryKey" | "queryFn">
) => {
  return useQuery<Review[], Error>({
    queryKey: ["reviews", id],
    queryFn: () => getReviewsByUser(id),
    enabled: Boolean(id),
    ...options,
  });
};
