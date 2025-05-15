import { ReviewResponse } from "../../../types/api";
import { Reply, Review } from "../types/models";

export const mapReviewsResponseToReview = (src: ReviewResponse): Review => ({
  id: src.id,
  userId: src.user.id,
  username: src.user.name,
  rating: src.value,
  comment: src.text,
  date: src.date,
  itemId: src.event,
  responseTo: src.responseTo,
});

export const mapReviewsResponseToReply = (src: ReviewResponse): Reply => ({
  id: src.id,
  userId: src.user.id,
  username: src.user.name,
  comment: src.text,
  date: src.date,
  responseTo: src.responseTo!,
});
