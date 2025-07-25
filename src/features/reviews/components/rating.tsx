import React from "react";
import { RatingStars } from "./rating-stars";

interface RatingProps {
  rating: number;
  totalReviews: number;
  totalRatedReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  totalReviews,
  totalRatedReviews,
  ratingDistribution,
}) => {
  const getPercentage = (count: number) => (count / totalRatedReviews) * 100;

  return (
    <div className="d-flex align-items-center">
      <div className="col-4 text-center me-3">
        <h1>{Number(rating.toFixed(1))}</h1>
        <RatingStars rating={rating} />
        <p className="text-muted">({totalReviews})</p>
      </div>
      <div className="col-8">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="row align-items-center mb-2">
            <div className="col-2 text-end pe-0 w-auto">
              <span className="text-muted">{star} </span>
            </div>
            <div className="col-10">
              <div className="progress">
                <div
                  className="progress-bar bg-warning"
                  role="progressbar"
                  style={{
                    width: `${getPercentage(
                      ratingDistribution[
                        star as keyof typeof ratingDistribution
                      ]
                    )}%`,
                  }}
                  aria-valuenow={getPercentage(
                    ratingDistribution[star as keyof typeof ratingDistribution]
                  )}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
