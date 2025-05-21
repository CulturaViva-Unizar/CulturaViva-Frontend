import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";

const deleteReviewFromEvent = async (
  commentId: string,
  motivo: string,
  eventId: string
) => {
  const params = new URLSearchParams();
  params.append("motivo", motivo);

  await api.delete(
    `/items/events/${eventId}/comments/${commentId}?${params.toString()}`
  );
};

export const useDeleteReviewFromEvent = () => {
  const qc = useQueryClient();
  return useMutation<
    void,
    Error,
    { commentId: string; motivo: string; eventId: string }
  >({
    mutationFn: ({ commentId, motivo, eventId }) =>
      deleteReviewFromEvent(commentId, motivo, eventId),
    onSuccess: (_, { eventId }) => {
      qc.removeQueries({ queryKey: ["reviews", eventId] });
      qc.removeQueries({ queryKey: ["analytics", "comments"] });
    },
  });
};
