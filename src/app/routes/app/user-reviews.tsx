import { useParams } from "react-router";
import SearchBar from "../../../components/ui/search-bar";
import MainLayout from "../../../components/layouts/main-layout";
import { CommentCard } from "../../../components/ui/comment-card";
import { useGetReviewsByUser } from "../../../features/reviews/api/get-reviews-by-user";
import { ErrorMessage } from "../../../components/errors/error-message";
import LoadingIndicator from "../../../components/ui/loading-indicator";
import { useMemo, useState } from "react";
import { formatDate } from "../../../utils/date";

function UserReviews() {
  const { userId } = useParams();
  const {
    data: reviews = [],
    isLoading,
    error,
  } = useGetReviewsByUser(userId ?? "");
  const [searchText, setSearchText] = useState<string>("");

  const filteredComments = useMemo(
    () =>
      reviews.filter((review) =>
        review.itemTitle!.toLowerCase().includes(searchText.toLowerCase())
      ),
    [reviews, searchText]
  );

  if (isLoading && !error) {
    return <LoadingIndicator message="Cargando comentarios..." />;
  }

  if (error) {
    return <ErrorMessage message="Error al cargar los comentarios" />;
  }

  return (
    <MainLayout title={`Comentarios de ${reviews[0].username}`}>
      <div className="mt-3 mb-5 d-flex flex-column align-items-start align-items-md-center justify-content-center">
        <div className="col-12 col-md-5">
          <SearchBar
            value={searchText}
            onSearch={setSearchText}
            className="shadow-sm rounded-pill"
          />
        </div>
      </div>
      <div className="d-flex">
        <div className="col-md-4"></div>
        <div className="col d-flex flex-column justify-content-center w-100">
          {filteredComments.map((review) => (
            <div key={review.id}>
              <CommentCard
                id={review.id}
                itemId={review.itemId}
                itemTitle={review.itemTitle!}
                itemType={review.itemType!}
                rating={review.rating}
                date={formatDate(review.date)}
                comment={review.comment ?? ""}
                deleted={review.deleted}
              />
              <hr />
            </div>
          ))}
        </div>
        <div className="col-md-4"></div>
      </div>
    </MainLayout>
  );
}

export default UserReviews;
