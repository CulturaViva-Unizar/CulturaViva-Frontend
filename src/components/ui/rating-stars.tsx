import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface RatingStarsProps {
  rating?: number;
  onClick?: (index: number) => void;
}

export const RatingStars: FC<RatingStarsProps> = ({ rating = 0, onClick }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={i < rating ? "text-warning" : "text-secondary"}
          onClick={onClick ? () => onClick(i) : undefined}
          style={{ cursor: onClick ? "pointer" : "default" }}
        />
      ))}
    </>
  );
};
