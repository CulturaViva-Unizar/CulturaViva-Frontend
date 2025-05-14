import { ReviewResponse } from "../../../types/api";
import { Review } from "../types/models";

export const mapReviewsResponseToReview = (src: ReviewResponse): Review => ({
  id: src.id,
  userId: src.user.id,
  username: src.user.name,
  rating: src.value,
  comment: src.text,
  date: src.date,
  replies: [],
  itemId: src.event,
});

export const mapUserReviewsResponseToReview = (
  src: ReviewResponse
): Review => ({
  id: src.id,
  userId: src.user.id,
  username: src.user.name,
  rating: src.value,
  comment: src.text,
  date: src.date,
  replies: [],
});
