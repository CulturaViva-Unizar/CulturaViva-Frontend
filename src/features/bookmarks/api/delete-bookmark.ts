import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { useUser } from "../../../lib/auth";

const deleteBookmark = async (userId: string, eventId: string) => {
  await api.delete(`/users/${userId}/saved-events/${eventId}`);
};

export const useDeleteBookmark = () => {
  const qc = useQueryClient();
  const user = useUser();
  return useMutation<void, Error, { userId: string; eventId: string }>({
    mutationFn: ({ userId, eventId }) => deleteBookmark(userId, eventId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookmarks", user.data?.id] });
      qc.invalidateQueries({ queryKey: ["events"] });
      qc.invalidateQueries({ queryKey: ["culturalPlaces"] });
    },
  });
};
