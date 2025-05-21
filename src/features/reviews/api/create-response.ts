import { useQueryClient, useMutation } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { Items } from "../../../shared/types/enums";
import { CreateResponseToReviewRequest } from "../../../types/api";
import { useUser } from "../../../lib/auth";

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
  const user = useUser();
  return useMutation({
    mutationFn: createResponse,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reviews"] });
      qc.invalidateQueries({ queryKey: ["replies"] });
      qc.invalidateQueries({ queryKey: ["analytics", "comments"] });
      qc.removeQueries({ queryKey: ["events"] });
      qc.removeQueries({ queryKey: ["culturalPlaces"] });
      qc.removeQueries({ queryKey: ["bookmarks", user.data?.id] });
    },
  });
};
