import { Items } from "../../../shared/types/enums";
import { ReviewResponse, UserReviewResponse } from "../../../types/api";
import { Reply, Review } from "../types/models";

export const mapReviewsResponseToReview = (src: ReviewResponse): Review => ({
  id: src.id,
  userId: src.user.id,
  username: src.user.name,
  rating: src.value!,
  comment: src.text,
  date: src.date,
  itemId: src.event,
  responseTo: src.responseTo,
  deleted: src.deleted,
});

export const mapUserReviewsResponseToReview = (
  src: UserReviewResponse
): Review => ({
  id: src.id,
  userId: src.user.id,
  username: src.user.name,
  rating: src.value!,
  comment: src.text,
  date: src.date,
  itemId: src.event.id,
  itemTitle: src.event.title,
  itemType: src.event.itemType == "Event" ? Items.Evento : Items.Lugar,
  responseTo: src.responseTo,
  deleted: src.deleted,
});

export const mapReviewsResponseToReply = (src: ReviewResponse): Reply => ({
  id: src.id,
  userId: src.user.id,
  username: src.user.name,
  comment: src.text,
  date: src.date,
  responseTo: src.responseTo!,
});
