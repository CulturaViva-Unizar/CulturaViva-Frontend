import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Link } from "react-router";
import { CardProps } from "../common/interfaces";

export const Card: FC<CardProps> = ({
  image,
  title,
  location,
  rating,
  reviews,
  description,
  onClick,
  className = "",
  to,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const CardContent = (
    <div className={`card border-0 ${className}`} onClick={handleClick}>
      <div className="row g-0">
        {image && (
          <div className="col-4">
            <img
              src={image}
              className="img-fluid rounded-start h-100 object-fit-cover"
              alt={title}
            />
          </div>
        )}
        <div className="col">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text text-muted mb-0">{location}</p>
            <div className="d-flex align-items-center gap-1">
              <p className="card-text text-muted mb-0">{rating}</p>
              <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} />
              <p className="card-text text-muted mb-0">({reviews})</p>
            </div>
            <p className="card-text">
              {description.length > 65
                ? `${description.slice(0, 65)}...`
                : description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return to ? (
    <Link to={to} className="text-decoration-none text-dark">
      {CardContent}
    </Link>
  ) : (
    CardContent
  );
};
