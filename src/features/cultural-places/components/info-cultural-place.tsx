/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import {
  faStar,
  faLocationArrow,
  faShareAlt,
  faBookmark,
  faXmark,
  faEuro,
  faPhone,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { FC, useMemo, useState } from "react";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { RatingStars } from "../../../components/ui/rating-stars";
import { Review } from "../../../components/ui/review";
import { Select } from "../../../components/ui/select";
import { useUser } from "../../../lib/auth";
import { Rating } from "../../../components/ui/rating";
import { CulturalPlace } from "../types/models";
import { useGetReviewsByCulturalPlace } from "../../reviews/api/get-reviews-by-cultural-place";
import {
  CreateBookmarkRequest,
  GetPaginatedEventsRequest,
} from "../../../types/api";
import { useGetBookmarksByUser } from "../../bookmarks/api/get-bookmarks-by-user";
import { useCreateBookmark } from "../../bookmarks/api/create-bookmark";
import { useDeleteBookmark } from "../../bookmarks/api/delete-bookmark";
import LoadingIndicator from "../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../components/errors/error-message";
import { paths } from "../../../config/paths";
import {
  FILTER_REVIEWS_OPTIONS,
  ORDER_REVIEWS_OPTIONS,
} from "../../../shared/constants/select-options";

type InfoCulturalPlaceProps = {
  culturalPlace: CulturalPlace;
  onClose: () => void;
};

const InfoCulturalPlace: FC<InfoCulturalPlaceProps> = ({
  culturalPlace,
  onClose,
}) => {
  const {
    data: reviews = [],
    isLoading: isLoadingReviews,
    error: errorReviews,
  } = useGetReviewsByCulturalPlace(culturalPlace.id);
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
    () => !!bookmarks?.items.some((item) => item.id === culturalPlace.id),
    [bookmarks, culturalPlace.id]
  );
  const createBookmarkMutation = useCreateBookmark();
  const deleteBookmarkMutation = useDeleteBookmark();
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
    culturalPlace.coordinates!.latitude
  },${culturalPlace.coordinates!.longitude}`;

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
            { userId: user.data!.id, eventId: culturalPlace.id },
            {
              onSuccess: () => {
                Swal.fire(
                  "Desmarcado",
                  "El lugar cultural ha sido desmarcado.",
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
        eventId: culturalPlace.id,
      };
      try {
        await createBookmarkMutation.mutateAsync({
          userId: user.data!.id,
          data: createBookmarkRequest,
        });
        Swal.fire({
          title: "¡Guardado!",
          text: "Puedes verlo en tus Guardados.",
          icon: "success",
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "Ir a Guardados",
          cancelButtonText: "Revisar más tarde",
          showCloseButton: true,
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

  const handleReviewSubmit = () => {
    if (myRating === 0) {
      Swal.fire("Error", "La reseña debe tener una puntuación.", "error");
      return;
    }

    /*
    const newReview = {
      id: "",
      userId: user.data!.id,
      rating: myRating,
      comment: myComment,
      date: new Date().toISOString(),
      replies: [],
    };
    setReviews([...reviews, newReview]);
    */
    setMyRating(0);
    setComment("");
    Swal.fire("¡Gracias!", "Tu reseña ha sido añadida.", "success");
  };

  const handleShare = async () => {
    const shareUrl = paths.app.culturalPlaces.details.getHref(culturalPlace.id);
    const shareText = `Echa un vistazo a este lugar: "${culturalPlace.title}"`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: culturalPlace.title,
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
    return (
      <LoadingIndicator message="Cargando información del lugar cultural..." />
    );
  }

  if (error) {
    return (
      <ErrorMessage message="Error al cargar la información del lugar cultural" />
    );
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
      <div className="row">
        {culturalPlace.image && (
          <div className="col-4">
            <img
              src={culturalPlace.image}
              className="img-fluid rounded h-100 object-fit-cover"
              alt={culturalPlace.title}
            />
          </div>
        )}
        <div className="col">
          <h2>{culturalPlace.title}</h2>
          <span className="text-muted">{culturalPlace.location}</span>
          <div className="d-flex align-items-center gap-1">
            <span className="text-muted">
              {reviews.length > 0 ? avgRating : 0}
            </span>
            <FontAwesomeIcon icon={faStar} color="gold" />
            <span className="text-muted">({reviews.length})</span>
          </div>
        </div>
      </div>
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
        {culturalPlace.instagram && (
          <Button
            as="a"
            href={culturalPlace.instagram}
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
        {culturalPlace.price && culturalPlace.price.length > 0
          ? culturalPlace.price.map((p) =>
              p.precio ? `${p.grupo}: ${p.precio}€` : "Gratis"
            )
          : "Gratis"}
      </div>
      {culturalPlace.phone && (
        <div className="mb-2">
          <FontAwesomeIcon icon={faPhone} className="me-2" />
          {culturalPlace.phone}
        </div>
      )}
      {culturalPlace.openingHours && (
        <div className="mb-2">
          <FontAwesomeIcon icon={faClock} className="me-2" />
          {culturalPlace.openingHours}
        </div>
      )}
      <p>{culturalPlace.description}</p>
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
            userId={review.userId}
            username="Username"
            rating={review.rating}
            comment={review.comment}
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

export default InfoCulturalPlace;
