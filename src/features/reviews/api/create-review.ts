import { useQueryClient, useMutation } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { Items } from "../../../shared/types/enums";
import { CreateReviewRequest } from "../../../types/api";
import { useUser } from "../../../lib/auth";

const createReview = async ({
  itemType,
  itemId,
  data,
}: {
  itemType: Items;
  itemId: string;
  data: CreateReviewRequest;
}) => {
  if (itemType == Items.Evento) {
    await api.post(`/items/events/${itemId}/comments`, data);
  } else {
    await api.post(`/items/places/${itemId}/comments`, data);
  }
};

export const useCreateReview = () => {
  const qc = useQueryClient();
  const user = useUser();
  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reviews"] });
      qc.invalidateQueries({ queryKey: ["analytics", "comments"] });
      qc.removeQueries({ queryKey: ["events"] });
      qc.removeQueries({ queryKey: ["culturalPlaces"] });
      qc.removeQueries({ queryKey: ["bookmarks", user.data?.id] });
    },
  });
};
