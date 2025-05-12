import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";

const deleteBookmark = async (userId: string, eventId: string) => {
  await api.delete(`/users/${userId}/saved-events/${eventId}`);
};

export const useDeleteBookmark = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, { userId: string; eventId: string }>({
    mutationFn: ({ userId, eventId }) => deleteBookmark(userId, eventId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
};
