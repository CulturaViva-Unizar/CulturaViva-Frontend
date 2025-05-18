/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import { faStar, faShareAlt, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { FC } from "react";
import { paths } from "../../config/paths";

type InfoItemHeaderProps = {
  itemId: string;
  image?: string;
  title: string;
  location?: string;
  totalReviews: number;
  avgRating: number;
  onClose: () => void;
  className?: string;
};

const InfoItemHeader: FC<InfoItemHeaderProps> = ({
  itemId,
  image,
  title,
  location,
  totalReviews,
  avgRating,
  onClose,
  className = "",
}) => {
  const handleShare = async () => {
    const shareUrl = paths.app.events.details.getHref(itemId);
    const shareText = `Echa un vistazo a esto: "${title}"`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err: any) {
        console.error("Share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        Swal.fire(
          "Enlace copiado",
          "Ya puedes pegarlo donde quieras 😊",
          "success"
        );
      } catch (err: any) {
        console.error("Share failed:", err);
        Swal.fire("Error", "No se pudo copiar el enlace", "error");
      }
    }
  };

  return (
    <div className={`${className}`}>
      <div className="text-end mb-2">
        <Button
          onClick={handleShare}
          className="btn btn-light rounded-circle me-2"
        >
          <FontAwesomeIcon icon={faShareAlt} />
        </Button>
        <Button className="btn btn-light rounded-circle" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </div>
      <div className="row">
        {image && (
          <div className="col-4">
            <img
              src={image}
              className="img-fluid rounded h-100 object-fit-cover"
              alt={title}
            />
          </div>
        )}
        <div className="col">
          <h2>{title}</h2>
          <span className="text-muted">{location}</span>
          <div className="d-flex align-items-center gap-1 my-1">
            <span className="text-muted">{Number(avgRating.toFixed(1))}</span>
            <FontAwesomeIcon icon={faStar} color="gold" />
            <span className="text-muted">({totalReviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoItemHeader;
