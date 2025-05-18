import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";

const deleteReviewFromEvent = async (commentId: string, eventId: string) => {
  await api.delete(`/items/events/${eventId}/comments/${commentId}`);
};

export const useDeleteReviewFromEvent = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, { commentId: string; eventId: string }>({
    mutationFn: ({ commentId, eventId }) =>
      deleteReviewFromEvent(commentId, eventId),
    onSuccess: (_, { eventId }) => {
      qc.invalidateQueries({ queryKey: ["reviews", eventId] });
      qc.invalidateQueries({ queryKey: ["analytics", "comments"] });
    },
  });
};
