import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { PostAttendingEventsRequest } from "../../../types/api";

const postAttendingEvent = async ({
  userId,
  data,
}: {
  userId: string;
  data: PostAttendingEventsRequest;
}) => {
  await api.post(`/users/${userId}/attending-events`, data);
};

export const usePostAttendingEvent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: postAttendingEvent,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["attendingEvents"] });
      qc.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
