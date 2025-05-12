/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { FC, useMemo, useState } from "react";
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
import { useCreateBookmark } from "../../bookmarks/api/create-bookmark";
import { useGetBookmarksByUser } from "../../bookmarks/api/get-bookmarks-by-user";
import {
  CreateBookmarkRequest,
  GetPaginatedEventsRequest,
} from "../../../types/api";
import { useDeleteBookmark } from "../../bookmarks/api/delete-bookmark";
import { usePostAttendingEvent } from "../api/post-attending-event";
import { useDeleteAttendingEvent } from "../api/delete-attending-event";
import { Rating } from "../../../components/ui/rating";
import { paths } from "../../../config/paths";
import { useNavigate } from "react-router";
import { useCreateReview } from "../../reviews/api/create-review";
import { Items } from "../../../shared/types/enums";

type InfoEventProps = {
  event: Event;
  onClose: () => void;
};

const InfoEvent: FC<InfoEventProps> = ({ event, onClose }) => {
  const navigate = useNavigate();
  const {
    data: reviews = [],
    isLoading: isLoadingReviews,
    error: errorReviews,
  } = useGetReviewsByEvent(event.id);
  const [myRating, setMyRating] = useState(0);
  const [myComment, setComment] = useState("");
  const [orderReviewOption, setOrderReviewOption] = useState("");
  const [filterReviewOption, setFilterReviewOption] = useState("");
  const user = useUser();
  const request: GetPaginatedEventsRequest = {
    userId: user.data!.id,
    page: 1,
    limit: 100,
  };
  const {
    data: bookmarks,
    isLoading: isLoadingBookmarks,
    error: errorBookmarks,
  } = useGetBookmarksByUser(request);
  const isSaved = useMemo(
    () => !!bookmarks?.items.some((item) => item.id === event.id),
    [bookmarks, event.id]
  );
  const [isAttending, setIsAttending] = useState<boolean>(
    event.assistants.some((a) => a === user.data!.id)
  );
  const [totalAssistants, setTotalAssistants] = useState<number>(
    event.totalAssistants
  );
  const createBookmarkMutation = useCreateBookmark();
  const deleteBookmarkMutation = useDeleteBookmark();
  const postAttendingEventMutation = usePostAttendingEvent();
  const deleteAttendingEventMutation = useDeleteAttendingEvent();
  const createReviewMutation = useCreateReview();
  const isLoading = isLoadingReviews || isLoadingBookmarks;
  const error = errorReviews || errorBookmarks;
  const avgRating = useMemo(
    () =>
      reviews && reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0,
    [reviews]
  );
  const ratingDistribution = useMemo(() => {
    const dist: Record<1 | 2 | 3 | 4 | 5, number> = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    reviews.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) {
        dist[r.rating as 1 | 2 | 3 | 4 | 5]++;
      }
    });

    return dist;
  }, [reviews]);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${
    event.coordinates!.latitude
  },${event.coordinates!.longitude}`;

  const handleAttendance = async () => {
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
          deleteAttendingEventMutation.mutate(
            { userId: user.data!.id, eventId: event.id },
            {
              onSuccess: () => {
                setIsAttending(false);
                setTotalAssistants((prev: number) => prev - 1);
                Swal.fire(
                  "Eliminado",
                  "Has dejado de asistir a esta exposición.",
                  "success"
                );
              },
              onError: (err) => {
                Swal.fire("Error", err.message, "error");
              },
            }
          );
        }
      });
    } else {
      const createBookmarkRequest: CreateBookmarkRequest = {
        eventId: event.id,
      };
      try {
        await postAttendingEventMutation.mutateAsync({
          userId: user.data!.id,
          data: createBookmarkRequest,
        });
        setIsAttending(true);
        setTotalAssistants((prev: number) => prev + 1);
        Swal.fire(
          "¡Asistencia confirmada!",
          "Has confirmado tu asistencia a esta exposición.",
          "success"
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        Swal.fire("Error", err, "error");
      }
    }
  };

  const handleSaveEvent = async () => {
    if (isSaved) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Ya no verás el evento en tus Guardados.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, desmarcar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteBookmarkMutation.mutate(
            { userId: user.data!.id, eventId: event.id },
            {
              onSuccess: () => {
                Swal.fire(
                  "Desmarcado",
                  "El evento ha sido desmarcado.",
                  "success"
                );
              },
              onError: (err) => {
                Swal.fire("Error", err.message, "error");
              },
            }
          );
        }
      });
    } else {
      const createBookmarkRequest: CreateBookmarkRequest = {
        eventId: event.id,
      };
      try {
        await createBookmarkMutation.mutateAsync({
          userId: user.data!.id,
          data: createBookmarkRequest,
        });
        Swal.fire({
          title: "¡Evento guardado!",
          text: "Puedes verlo en tus Guardados.",
          icon: "success",
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "Ir a Guardados",
          cancelButtonText: "Revisar más tarde",
          showCloseButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(paths.app.bookmarks.getHref());
          }
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        Swal.fire("Error", err, "error");
      }
    }
  };

  const handleStarClick = (index: number) => {
    setMyRating(index + 1);
  };

  const handleReviewSubmit = async () => {
    if (myRating === 0) {
      Swal.fire("Error", "La reseña debe tener una puntuación.", "error");
      return;
    }

    await createReviewMutation.mutateAsync({
      itemId: event.id,
      itemType: Items.Evento,
      data: {
        text: myComment,
        value: myRating,
      },
    });

    setMyRating(0);
    setComment("");
    Swal.fire("¡Gracias!", "Tu reseña ha sido añadida.", "success");
  };

  const handleShare = async () => {
    const shareUrl = paths.app.events.details.getHref(event.id);
    const shareText = `Echa un vistazo a este evento: "${event.title}"`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
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

  if (isLoading && !error) {
    return <LoadingIndicator message="Cargando información del evento..." />;
  }

  if (error) {
    return <ErrorMessage message="Error al cargar la información del evento" />;
  }

  return (
    <div className="p-3">
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
            <span className="text-muted">
              {reviews.length > 0 ? avgRating : 0}
            </span>
            <FontAwesomeIcon icon={faStar} color="gold" />
            <span className="text-muted">({reviews.length})</span>
          </div>
        </div>
      </div>
      <Button
        variant={isAttending ? "danger" : "success"}
        className="w-100 rounded-pill"
        onClick={handleAttendance}
        disabled={postAttendingEventMutation.isPending}
      >
        <FontAwesomeIcon
          icon={isAttending ? faMinus : faPlus}
          className="me-2"
        />
        {postAttendingEventMutation.isPending
          ? "Cargando..."
          : isAttending
          ? `Dejar de asistir (${totalAssistants})`
          : `Voy a asistir (${totalAssistants})`}
      </Button>
      <div
        className="row flex-nowrap overflow-x-auto hide-scrollbar gap-2 gx-2 py-3"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <Button
          className={`btn rounded-pill w-auto ${
            isSaved ? "btn-dark" : "btn-light"
          }`}
          onClick={handleSaveEvent}
          disabled={isLoadingBookmarks || createBookmarkMutation.isPending}
        >
          <FontAwesomeIcon icon={faBookmark} className="me-2" />
          {createBookmarkMutation.isPending
            ? "Cargando..."
            : isSaved
            ? "Dejar de guardar"
            : "Guardar"}
        </Button>
        <Button
          as="a"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-light rounded-pill w-auto"
        >
          <FontAwesomeIcon icon={faLocationArrow} className="me-2" /> Cómo
          llegar
        </Button>
        {event.instagram && (
          <Button
            as="a"
            href={event.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light rounded-circle w-auto"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </Button>
        )}
      </div>
      <div className="mb-2">
        <FontAwesomeIcon icon={faEuro} className="me-2" />
        {event.price && event.price.length > 0
          ? event.price.map((p) =>
              p.precio ? `${p.grupo}: ${p.precio}€` : "Gratis"
            )
          : "Gratis"}
      </div>
      <div className="mb-2">
        <FontAwesomeIcon icon={faCalendar} className="me-2" />
        {format(event.startDate, "dd/MM/yyyy")}
      </div>
      <p>{event.description}</p>
      <hr />
      <Rating
        rating={avgRating}
        totalReviews={reviews.length}
        ratingDistribution={ratingDistribution}
      />
      <hr />
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
                value={myComment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                className="btn btn-dark rounded-pill w-auto"
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
          <Review
            key={review.id}
            username={review.username}
            rating={review.rating}
            comment={review.comment ?? ""}
            date={review.date}
            replies={review.replies}
          />
        ))
      ) : (
        <div className="text-center border p-2 rounded">
          <span>No hay reseñas</span>
        </div>
      )}
    </div>
  );
};

export default InfoEvent;
