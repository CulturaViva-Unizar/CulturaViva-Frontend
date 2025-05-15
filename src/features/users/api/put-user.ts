import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { PutUserRequest } from "../../../types/api";

const putUser = async ({ id, data }: { id: string; data: PutUserRequest }) => {
  await api.put(`/users/${id}`, data);
};

export const usePutUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: putUser,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
