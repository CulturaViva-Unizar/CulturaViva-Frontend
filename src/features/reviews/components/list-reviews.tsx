import { FC, useState } from "react";
import { Select } from "../../../components/ui/select";
import {
  FILTER_REVIEWS_OPTIONS,
  ORDER_REVIEWS_OPTIONS,
} from "../../../shared/constants/select-options";
import { ReviewItem } from "./review-item";
import { Review } from "../types/models";
import { Items } from "../../../shared/types/enums";

type ListReviewsProps = {
  itemType: Items;
  reviews?: Review[];
};

const ListReviews: FC<ListReviewsProps> = ({ itemType, reviews }) => {
  const [orderReviewOption, setOrderReviewOption] = useState("");
  const [filterReviewOption, setFilterReviewOption] = useState("");

  return (
    <>
      <div className="d-flex gap-3 mb-3">
        <Select
          className="col shadow-sm"
          options={ORDER_REVIEWS_OPTIONS}
          value={orderReviewOption}
          onChange={setOrderReviewOption}
        />
        <Select
          className="col shadow-sm"
          options={FILTER_REVIEWS_OPTIONS}
          value={filterReviewOption}
          onChange={setFilterReviewOption}
        />
      </div>
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewItem
            key={review.id}
            id={review.id}
            itemId={review.itemId}
            username={review.username}
            rating={review.rating}
            comment={review.comment ?? ""}
            date={review.date}
            itemType={itemType}
          />
        ))
      ) : (
        <div className="text-center border p-2 rounded">
          <span>No hay reseñas</span>
        </div>
      )}
    </>
  );
};

export default ListReviews;
