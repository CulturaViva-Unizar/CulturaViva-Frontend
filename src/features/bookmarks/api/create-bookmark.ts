import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { CreateBookmarkRequest } from "../../../types/api";
import { useUser } from "../../../lib/auth";

const createBookmark = async ({
  userId,
  data,
}: {
  userId: string;
  data: CreateBookmarkRequest;
}) => {
  await api.post(`/users/${userId}/saved-events`, data);
};

export const useCreateBookmark = () => {
  const qc = useQueryClient();
  const user = useUser();
  return useMutation({
    mutationFn: createBookmark,
    onSuccess: async () => {
      qc.removeQueries({ queryKey: ["bookmarks", user.data?.id] });
      qc.removeQueries({ queryKey: ["events"] });
      qc.removeQueries({ queryKey: ["culturalPlaces"] });
      qc.removeQueries({ queryKey: ["analytics", "savedItems"] });
    },
  });
};
