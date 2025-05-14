import { faEuro, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useMemo } from "react";
import { useUser } from "../../../lib/auth";
import { Event } from "../types/models";
import { useGetReviewsByEvent } from "../../reviews/api/get-reviews-by-event";
import LoadingIndicator from "../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../components/errors/error-message";
import { format } from "date-fns";
import { useGetBookmarksByUser } from "../../bookmarks/api/get-bookmarks-by-user";
import { GetPaginatedEventsRequest } from "../../../types/api";
import { Rating } from "../../../components/ui/rating";
import { Items } from "../../../shared/types/enums";
import InfoItemHeader from "../../../components/ui/info-item-header";
import { AttendanceButton } from "../../../components/ui/attendance-button";
import InfoItemActionButtons from "../../../components/ui/info-item-action-buttons";
import PostReview from "../../reviews/components/post-review";
import ListReviews from "../../reviews/components/list-reviews";

type InfoEventProps = {
  event: Event;
  onClose: () => void;
  className?: string;
};

const InfoEvent: FC<InfoEventProps> = ({ event, onClose, className = "" }) => {
  const {
    data: reviews = [],
    isLoading: isLoadingReviews,
    error: errorReviews,
  } = useGetReviewsByEvent(event.id);
  const user = useUser();
  const request: GetPaginatedEventsRequest = {
    userId: user.data?.id,
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

  if (isLoading && !error) {
    return <LoadingIndicator message="Cargando información del evento..." />;
  }

  if (error) {
    return <ErrorMessage message="Error al cargar la información del evento" />;
  }

  return (
    <div className={`p-3 ${className}`}>
      <InfoItemHeader
        itemId={event.id}
        image={event.image}
        title={event.title}
        location={event.location}
        totalReviews={reviews.length}
        avgRating={avgRating}
        onClose={onClose}
        className="mb-4"
      />
      {user.data && (
        <AttendanceButton
          eventId={event.id}
          isAttendingInit={event.assistants.some((a) => a === user.data?.id)}
          totalAssistantsInit={event.totalAssistants}
        />
      )}
      <InfoItemActionButtons
        itemId={event.id}
        isSaved={isSaved}
        isLoading={isLoading}
        mapsUrl={mapsUrl}
        instagramUrl={event.instagram}
        twitterUrl={event.twitter}
      />
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
          <PostReview itemId={event.id} itemType={Items.Evento} />
          <hr />
        </>
      )}
      <ListReviews itemType={Items.Evento} reviews={reviews} />
    </div>
  );
};

export default InfoEvent;
