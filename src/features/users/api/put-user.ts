import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { PutUserRequest } from "../../../types/api";

const putUser = async ({
  id,
  motivo,
  data,
}: {
  id: string;
  motivo: string;
  data: PutUserRequest;
}) => {
  const params = new URLSearchParams();
  params.append("motivo", motivo);

  await api.put(`/users/${id}?${params.toString()}`, data);
};

export const usePutUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: putUser,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["analytics", "users"] });
      qc.invalidateQueries({ queryKey: ["analytics", "disabledUsers"] });
    },
  });
};
