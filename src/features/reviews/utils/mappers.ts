import { ReviewResponse } from "../../../types/api";
import { Review } from "../types/models";

export const mapReviewsResponseToReview = (src: ReviewResponse): Review => ({
  id: src._id,
  userId: src.user._id,
  username: src.user.name,
  rating: src.value,
  comment: src.text,
  date: src.date,
  replies: [],
  itemId: src.item
});
