import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Link } from "react-router";

type CardProps = {
  image?: string;
  title: string;
  location?: string;
  rating: number;
  reviews: number;
  description?: string;
  onClick?: () => void;
  className?: string;
  to?: string;
};

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
  const CardContent = (
    <div
      className={`card border-0 ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="d-flex g-0 h-100">
        {image && (
          <div className="col-4">
            <img
              src={image}
              className="img-fluid rounded-start h-100 object-fit-cover"
              alt={title}
            />
          </div>
        )}
        <div className="col card-body">
          <h5 className="card-title">
            {title.length > 65
              ? `${title.slice(0, 65)}...`
              : title
            }
            </h5>
          <p className="card-text text-muted mb-0">{location}</p>
          <div className="d-flex align-items-center gap-1">
            <p className="card-text text-muted mb-0">{Number(rating.toFixed(1))}</p>
            <FontAwesomeIcon icon={faStar} color="gold" />
            <p className="card-text text-muted mb-0">({reviews})</p>
          </div>
          <p className="card-text">
            {description
              ? description.length > 65
                ? `${description.slice(0, 65)}...`
                : description
              : ""}
          </p>
        </div>
      </div>
    </div>
  );

  return to ? <Link to={to}>{CardContent}</Link> : CardContent;
};
