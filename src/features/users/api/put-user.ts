import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";

const putUser = async (id: string) => {
  await api.put(`/users/${id}`);
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
