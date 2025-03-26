import Swal from "sweetalert2";
import {
  faStar,
  faLocationArrow,
  faShareAlt,
  faBookmark,
  faXmark,
  faEuro,
  faPhone,
  faGlobe,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { Rating } from "./Rating";
import { FC, useState } from "react";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Review } from "./Review";
import { Select } from "./Select";
import { InfoCulturalPlaceProps } from "../common/interfaces";
import { useAuth } from "../context/AuthContext";
import { ADMIN_ROLE, USER_ROLE } from "../common/constants";
import { RatingStars } from "./RatingStars";

const InfoCulturalPlace: FC<InfoCulturalPlaceProps> = ({
  image,
  title,
  location,
  rating,
  totalReviews,
  ratingDistribution,
  timetable,
  description,
  phone,
  web,
  price,
  facebook,
  instagram,
  twitter,
  reviewsInit,
  onClose,
}) => {
  const [saved, setSaved] = useState(false);
  const [reviews, setReviews] = useState(reviewsInit);
  const [myRating, setMyRating] = useState(0);
  const [comment, setComment] = useState("");
  const { user } = useAuth();

  const handleSaveEvent = () => {
    if (saved) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Ya no verás el evento en tus Guardados.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, desmarcar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          setSaved(false);
        }
      });
    } else {
      setSaved(true);
      Swal.fire({
        title: "¡Evento guardado!",
        text: "Puedes verlo en tus Guardados.",
        icon: "success",
      });
    }
  };

  const handleStarClick = (index: number) => {
    setMyRating(index + 1);
  };

  const handleReviewSubmit = () => {
    if (myRating === 0) {
      Swal.fire("Error", "La reseña debe tener una puntuación.", "error");
      return;
    }

    const newReview = {
      userId: 0,
      username: "Tú",
      rating: myRating,
      comment,
      date: "hace un momento",
      replies: [],
      map: function (): React.ReactNode {
        throw new Error("Function not implemented.");
      },
    };

    setReviews([...reviews, newReview]);
    setMyRating(0);
    setComment("");
    Swal.fire("¡Gracias!", "Tu reseña ha sido añadida.", "success");
  };

  return (
    <div className="p-3">
      <div className="text-end mb-2">
        <Button className="btn btn-light rounded-circle me-2">
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
          <div className="d-flex align-items-center gap-1">
            <span className="text-muted">{rating}</span>
            <FontAwesomeIcon icon={faStar} color="gold" />
            <span className="text-muted">({totalReviews})</span>
          </div>
        </div>
      </div>
      <div
        className="row flex-nowrap overflow-x-auto hide-scrollbar gap-2 gx-2 py-3"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <Button
          className={`btn rounded-pill w-auto ${
            saved ? "btn-dark" : "btn-light"
          }`}
          onClick={handleSaveEvent}
        >
          <FontAwesomeIcon icon={faBookmark} className="me-2" />
          {saved ? <span>Dejar de guardar</span> : <span>Guardar</span>}
        </Button>
        <Button className="btn btn-light rounded-pill w-auto">
          <FontAwesomeIcon icon={faLocationArrow} className="me-2" /> Cómo llegar
        </Button>
        {facebook && (
          <Button className="btn btn-light rounded-circle w-auto">
            <FontAwesomeIcon icon={faFacebook} />
          </Button>
        )}
        {instagram && (
          <Button className="btn btn-light rounded-circle w-auto">
            <FontAwesomeIcon icon={faInstagram} />
          </Button>
        )}
        {twitter && (
          <Button className="btn btn-light rounded-circle w-auto">
            <FontAwesomeIcon icon={faTwitter} />
          </Button>
        )}
      </div>
      <div className="mb-2">
        <FontAwesomeIcon icon={faEuro} className="me-2" />
        {price ? price : "Gratis"}
      </div>
      {phone && (
        <div className="mb-2">
          <FontAwesomeIcon icon={faPhone} className="me-2" />
          {phone}
        </div>
      )}
      {web && (
        <div className="mb-2">
          <FontAwesomeIcon icon={faGlobe} className="me-2" />
          {web}
        </div>
      )}
      <div className="mb-2">
        <FontAwesomeIcon icon={faClock} className="me-2" />
        {timetable}
      </div>
      <p>{description}</p>
      <hr />
      <Rating
        rating={rating}
        totalReviews={totalReviews}
        ratingDistribution={ratingDistribution}
      />
      <hr />
      {(user?.role == USER_ROLE || user?.role == ADMIN_ROLE) && (
        <>
          <div className="d-flex">
            <div className="col-3">
              <strong>Valorar y escribir una reseña:</strong>
            </div>
            <div className="col-9 ps-4">
              <RatingStars
                rating={myRating}
                onClick={(index) => handleStarClick(index)}
              />
              <p className="form-label pt-2">Comentario (opcional)</p>
              <textarea
                className="form-control mb-3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                className="btn btn-light rounded-pill w-auto"
                onClick={handleReviewSubmit}
              >
                Enviar
              </Button>
            </div>
          </div>
          <hr />
        </>
      )}
      <div className="d-flex gap-3 mb-3">
        <Select
          options={[
            { value: "ordenar", label: "Ordenar" },
            { value: "masRecientes", label: "Más Recientes" },
            { value: "menosRecientes", label: "Menos Recientes" },
            { value: "mayorPuntuacion", label: "Mayor Puntuación" },
            { value: "menorPuntuacion", label: "Menor Puntuación" },
          ]}
          initialValue="ordenar"
          onChange={(newValue) => console.log(newValue)}
          className="col"
        />
        <Select
          options={[
            { value: "filtrar", label: "Filtrar" },
            { value: "5", label: "5 estrellas" },
            { value: "4", label: "4 estrellas" },
            { value: "3", label: "3 estrellas" },
            { value: "2", label: "2 estrellas" },
            { value: "1", label: "1 estrellas" },
          ]}
          initialValue="filtrar"
          onChange={(newValue) => console.log(newValue)}
          className="col"
        />
      </div>
      {reviews.map((review, i) => (
        <Review
          key={i}
          userId={review.userId}
          username={review.username}
          rating={review.rating}
          comment={review.comment}
          date={review.date}
          replies={review.replies}
        />
      ))}
    </div>
  );
};

export default InfoCulturalPlace;
