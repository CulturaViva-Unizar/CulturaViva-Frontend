import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";

const deleteReviewFromCulturalPlace = async (
  commentId: string,
  motivo: string,
  culturalPlaceId: string
) => {
  const params = new URLSearchParams();
  params.append("motivo", motivo);

  await api.delete(
    `/items/places/${culturalPlaceId}/comments/${commentId}?${params.toString()}`
  );
};

export const useDeleteReviewFromCulturalPlace = () => {
  const qc = useQueryClient();
  return useMutation<
    void,
    Error,
    { commentId: string; motivo: string; culturalPlaceId: string }
  >({
    mutationFn: ({ commentId, motivo, culturalPlaceId }) =>
      deleteReviewFromCulturalPlace(commentId, motivo, culturalPlaceId),
    onSuccess: (_, { culturalPlaceId }) => {
      qc.invalidateQueries({ queryKey: ["reviews", culturalPlaceId] });
      qc.invalidateQueries({ queryKey: ["analytics", "comments"] });
    },
  });
};
