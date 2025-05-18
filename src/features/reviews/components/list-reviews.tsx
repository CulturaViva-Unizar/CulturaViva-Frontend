import { FC, useMemo, useState } from "react";
import { Select } from "../../../components/ui/select";
import {
  FILTER_REVIEWS_OPTIONS,
  ORDER_REVIEWS_OPTIONS,
} from "../../../shared/constants/select-options";
import { ReviewItem } from "./review-item";
import { Review } from "../types/models";
import { Items } from "../../../shared/types/enums";
import { ORDER_REVIEW_COMPARATORS } from "../../../utils/review";

type ListReviewsProps = {
  itemType: Items;
  reviews?: Review[];
};

const ListReviews: FC<ListReviewsProps> = ({ itemType, reviews }) => {
  const [orderReviewOption, setOrderReviewOption] = useState("");
  const [filterReviewOption, setFilterReviewOption] = useState("");

  const visibleReviews = useMemo(() => {
    if (!reviews) return [];

    let list = reviews.filter((r) => !r.responseTo);

    if (filterReviewOption) {
      const ratingFilter = Number(filterReviewOption);
      list = list.filter((r) => r.rating === ratingFilter);
    }

    const comparator = ORDER_REVIEW_COMPARATORS[orderReviewOption];
    if (comparator) {
      list = [...list].sort(comparator);
    }

    return list;
  }, [reviews, filterReviewOption, orderReviewOption]);

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
      {visibleReviews.length > 0 ? (
        visibleReviews.map((review: Review) => (
          <ReviewItem
            key={review.id}
            id={review.id}
            itemId={review.itemId}
            userId={review.userId}
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
