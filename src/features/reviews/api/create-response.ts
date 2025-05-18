import { useQueryClient, useMutation } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { Items } from "../../../shared/types/enums";
import { CreateResponseToReviewRequest } from "../../../types/api";

const createResponse = async ({
  itemType,
  itemId,
  commentId,
  data,
}: {
  itemType: Items;
  itemId: string;
  commentId: string;
  data: CreateResponseToReviewRequest;
}) => {
  if (itemType == Items.Evento) {
    await api.post(
      `/items/events/${itemId}/comments/${commentId}/responses`,
      data
    );
  } else {
    await api.post(
      `/items/places/${itemId}/comments/${commentId}/responses`,
      data
    );
  }
};

export const useCreateResponse = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createResponse,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reviews"] });
      qc.invalidateQueries({ queryKey: ["analytics", "comments"] });
    },
  });
};
