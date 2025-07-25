import { faEuro, faPhone, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useMemo } from "react";
import { useUser } from "../../../lib/auth";
import { Rating } from "../../reviews/components/rating";
import { CulturalPlace } from "../types/models";
import { useGetReviewsByCulturalPlace } from "../../reviews/api/get-reviews-by-cultural-place";
import { GetPaginatedEventsRequest } from "../../../types/api";
import { useGetBookmarksByUser } from "../../bookmarks/api/get-bookmarks-by-user";
import LoadingIndicator from "../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../components/errors/error-message";
import InfoItemHeader from "../../../components/ui/info-item-header";
import InfoItemActionButtons from "../../../components/ui/info-item-action-buttons";
import PostReview from "../../reviews/components/post-review";
import { Items } from "../../../shared/types/enums";
import ListReviews from "../../reviews/components/list-reviews";
import { isEmptyOrSpaces } from "../../../utils/common";

type InfoCulturalPlaceProps = {
  culturalPlace: CulturalPlace;
  onClose: () => void;
  className?: string;
};

const InfoCulturalPlace: FC<InfoCulturalPlaceProps> = ({
  culturalPlace,
  onClose,
  className = "",
}) => {
  const {
    data: reviews = [],
    isLoading: isLoadingReviews,
    error: errorReviews,
  } = useGetReviewsByCulturalPlace(culturalPlace.id);
  const user = useUser();
  const request: GetPaginatedEventsRequest = { page: 1, limit: 100 };
  const {
    data: bookmarks,
    isLoading: isLoadingBookmarks,
    error: errorBookmarks,
  } = useGetBookmarksByUser(user.data?.id ?? "", request);
  const isSaved = useMemo(
    () => !!bookmarks?.items.some((item) => item.id === culturalPlace.id),
    [bookmarks, culturalPlace.id]
  );
  const isLoading = isLoadingReviews || isLoadingBookmarks;
  const error = errorReviews || errorBookmarks;
  const parentReviews = useMemo(
    () => reviews.filter((r) => !r.responseTo),
    [reviews]
  );
  const avgRating = useMemo(() => {
    if (!parentReviews || parentReviews.length === 0) return 0;

    const sum = parentReviews.reduce((acc, r) => acc + r.rating, 0);

    const avg = sum / parentReviews.length;
    return Number(avg.toFixed(2));
  }, [parentReviews]);
  const ratingDistribution = useMemo(() => {
    const dist: Record<1 | 2 | 3 | 4 | 5, number> = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    parentReviews.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) {
        dist[r.rating as 1 | 2 | 3 | 4 | 5]++;
      }
    });

    return dist;
  }, [parentReviews]);
  const mapsUrl = culturalPlace.location
    ? `https://www.google.com/maps/search/?api=1&query=${culturalPlace.coordinates?.latitude},${culturalPlace.coordinates?.longitude}`
    : undefined;

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
    <div className={`p-3 ${className}`}>
      <InfoItemHeader
        itemId={culturalPlace.id}
        image={culturalPlace.image}
        title={culturalPlace.title}
        location={culturalPlace.location}
        totalReviews={reviews.length}
        avgRating={avgRating}
        onClose={onClose}
      />
      <InfoItemActionButtons
        itemId={culturalPlace.id}
        isSaved={isSaved}
        isLoading={isLoading}
        mapsUrl={mapsUrl}
        instagramUrl={culturalPlace.instagram}
        twitterUrl={culturalPlace.twitter}
      />
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
      {!isEmptyOrSpaces(culturalPlace.openingHours) && (
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
        totalRatedReviews={parentReviews.length}
        ratingDistribution={ratingDistribution}
      />
      <hr />
      {user.data && (
        <>
          <PostReview itemId={culturalPlace.id} itemType={Items.Lugar} />
          <hr />
        </>
      )}
      <ListReviews reviews={reviews} itemType={Items.Lugar} />
    </div>
  );
};

export default InfoCulturalPlace;
