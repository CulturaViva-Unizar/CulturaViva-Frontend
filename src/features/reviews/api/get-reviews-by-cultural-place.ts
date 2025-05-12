import { useQuery } from "@tanstack/react-query";
import {
  ApiResponse,
  GetReviewsByCulturalPlaceResponse,
} from "../../../types/api";
import { api } from "../../../lib/api-client";
import { Review } from "../types/models";
import { mapReviewsResponseToReview } from "../utils/mappers";

export const getReviewsByCulturalPlace = async (
  id: string
): Promise<Review[]> => {
  const response: ApiResponse<GetReviewsByCulturalPlaceResponse> =
    await api.get(`/items/places/${id}/comments`);

  const { data: reviews = [] } = response;

  return reviews.map(mapReviewsResponseToReview);
};

export const useGetReviewsByCulturalPlace = (id: string) => {
  return useQuery<Review[], Error>({
    queryKey: ["reviews", id],
    queryFn: () => getReviewsByCulturalPlace(id),
  });
};
