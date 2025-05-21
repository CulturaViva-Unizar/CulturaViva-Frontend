import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";

const deleteAttendingEvent = async (userId: string, eventId: string) => {
  await api.delete(`/users/${userId}/attending-events/${eventId}`);
};

export const useDeleteAttendingEvent = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, { userId: string; eventId: string }>({
    mutationFn: ({ userId, eventId }) => deleteAttendingEvent(userId, eventId),
    onSuccess: () => {
      qc.removeQueries({ queryKey: ["attendingEvents"] });
      qc.removeQueries({ queryKey: ["events"] });
    },
  });
};
