import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";

const deleteReviewFromCulturalPlace = async (
  commentId: string,
  culturalPlaceId: string
) => {
  await api.delete(`/items/places/${culturalPlaceId}/comments/${commentId}`);
};

export const useDeleteReviewFromCulturalPlace = () => {
  const qc = useQueryClient();
  return useMutation<
    void,
    Error,
    { commentId: string; culturalPlaceId: string }
  >({
    mutationFn: ({ commentId, culturalPlaceId }) =>
      deleteReviewFromCulturalPlace(commentId, culturalPlaceId),
    onSuccess: (_, { culturalPlaceId }) => {
      qc.invalidateQueries({ queryKey: ["reviews", culturalPlaceId] });
    },
  });
};
