import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { useUser } from "../../../lib/auth";

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
  const user = useUser();
  return useMutation<
    void,
    Error,
    { commentId: string; motivo: string; eventId: string }
  >({
    mutationFn: ({ commentId, motivo, eventId }) =>
      deleteReviewFromEvent(commentId, motivo, eventId),
    onSuccess: (_, { eventId }) => {
      qc.invalidateQueries({ queryKey: ["reviews", eventId] });
      qc.invalidateQueries({ queryKey: ["replies", eventId] });
      qc.invalidateQueries({ queryKey: ["analytics", "comments"] });
      qc.removeQueries({ queryKey: ["events"] });
      qc.removeQueries({ queryKey: ["culturalPlaces"] });
      qc.removeQueries({ queryKey: ["bookmarks", user.data?.id] });
    },
  });
};
