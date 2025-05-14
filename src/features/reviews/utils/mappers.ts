import { ReviewResponse } from "../../../types/api";
import { Reply, Review } from "../types/models";

export const mapReviewsResponseToReview = (src: ReviewResponse): Review => ({
  id: src._id,
  userId: src.user._id,
  username: src.user.name,
  rating: src.value,
  comment: src.text,
  date: src.date,
  itemId: src.event,
});

export const mapReviewsResponseToReply = (src: ReviewResponse): Reply => ({
  id: src._id,
  userId: src.user._id,
  username: src.user.name,
  comment: src.text,
  date: src.date,
});
