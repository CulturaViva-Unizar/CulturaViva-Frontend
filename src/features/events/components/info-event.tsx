import Swal from "sweetalert2";
import {
  faStar,
  faLocationArrow,
  faShareAlt,
  faPlus,
  faMinus,
  faBookmark,
  faXmark,
  faEuro,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { FC, useState } from "react";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { RatingStars } from "../../../components/ui/rating-stars";
import { Review } from "../../../components/ui/review";
import { Select } from "../../../components/ui/select";
import { useUser } from "../../../lib/auth";
import { Event } from "../types/models";
import { useGetReviewsByEvent } from "../../reviews/api/get-reviews-by-event";
import LoadingIndicator from "../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../components/errors/error-message";
import { format } from "date-fns";
import {
  FILTER_REVIEWS_OPTIONS,
  ORDER_REVIEWS_OPTIONS,
} from "../../../shared/constants/select-options";

type InfoEventProps = {
  event: Event;
  onClose: () => void;
};

const InfoEvent: FC<InfoEventProps> = ({ event, onClose }) => {
  const {
    data: reviewsInit = [],
    isLoading: isLoadingReviews,
    error: errorReviews,
  } = useGetReviewsByEvent(event.id);
  const [isAttending, setIsAttending] = useState(false);
  const [attendees, setAttendees] = useState(event.totalAssistants);
  const [saved, setSaved] = useState(false);
  const [reviews, setReviews] = useState(reviewsInit);
  const [myRating, setMyRating] = useState(0);
  const [comment, setComment] = useState("");
  const [orderReviewOption, setOrderReviewOption] = useState("");
  const [filterReviewOption, setFilterReviewOption] = useState("");
  const user = useUser();

  const handleAttendance = () => {
    if (isAttending) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Dejarás de asistir a esta exposición.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, dejar de asistir",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsAttending(false);
          setAttendees((prev: number) => prev - 1);
        }
      });
    } else {
      setIsAttending(true);
      setAttendees((prev: number) => prev + 1);
      Swal.fire({
        title: "¡Asistencia confirmada!",
        text: "Has confirmado tu asistencia a esta exposición.",
        icon: "success",
      });
    }
  };

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
      id: "",
      userId: user.data!.id,
      rating: myRating,
      comment,
      date: new Date().toISOString(),
      replies: [],
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
      <div className="row mb-4">
        {event.image && (
          <div className="col-4">
            <img
              src={event.image}
              className="img-fluid rounded h-100 object-fit-cover"
              alt={event.title}
            />
          </div>
        )}
        <div className="col">
          <h2>{event.title}</h2>
          <span className="text-muted">{event.location}</span>
          <div className="d-flex align-items-center gap-1 my-1">
            <span className="text-muted">{5.0}</span>
            <FontAwesomeIcon icon={faStar} color="gold" />
            <span className="text-muted">({reviews.length})</span>
          </div>
        </div>
      </div>
      <Button
        variant={isAttending ? "danger" : "success"}
        className="w-100 rounded-pill"
        onClick={handleAttendance}
      >
        <FontAwesomeIcon
          icon={isAttending ? faMinus : faPlus}
          className="me-2"
        />
        {isAttending ? "Dejar de asistir" : "Voy a asistir"} ({attendees})
      </Button>
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
          <FontAwesomeIcon icon={faLocationArrow} className="me-2" /> Cómo
          llegar
        </Button>
        {event.instagram && (
          <Button className="btn btn-light rounded-circle w-auto">
            <FontAwesomeIcon icon={faInstagram} />
          </Button>
        )}
      </div>
      <div className="mb-2">
        <FontAwesomeIcon icon={faEuro} className="me-2" />
        Gratis
        {/*event.price ? event.price : "Gratis"*/}
      </div>
      <div className="mb-2">
        <FontAwesomeIcon icon={faCalendar} className="me-2" />
        {format(event.startDate, "dd/MM/yyyy")}
      </div>
      <p>{event.description}</p>
      <hr />
      {isLoadingReviews && !errorReviews && (
        <LoadingIndicator message="Cargando reseñas..." />
      )}
      {errorReviews && <ErrorMessage message="Error al cargar las reseñas" />}
      {/*<Rating
        rating={rating}
        totalReviews={totalReviews}
        ratingDistribution={ratingDistribution}
      />
      <hr />
      */}
      {user.data && (
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
          className="col"
          options={ORDER_REVIEWS_OPTIONS}
          value={orderReviewOption}
          onChange={setOrderReviewOption}
        />
        <Select
          className="col"
          options={FILTER_REVIEWS_OPTIONS}
          value={filterReviewOption}
          onChange={setFilterReviewOption}
        />
      </div>
      {reviews && reviews.length > 0 ? (
        reviews.map((review, i) => (
          <Review
            key={i}
            userId={review.userId}
            username="Username"
            rating={review.rating}
            comment={review.comment}
            date={review.date}
            replies={review.replies}
          />
        ))
      ) : (
        <span>No hay reseñas</span>
      )}
    </div>
  );
};

export default InfoEvent;
