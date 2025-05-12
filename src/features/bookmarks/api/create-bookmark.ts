import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { CreateBookmarkRequest } from "../../../types/api";

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
  return useMutation({
    mutationFn: createBookmark,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
};
