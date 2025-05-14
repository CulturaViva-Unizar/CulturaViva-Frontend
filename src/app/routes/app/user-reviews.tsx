import { useParams } from "react-router";
import SearchBar from "../../../components/ui/search-bar";
import MainLayout from "../../../components/layouts/main-layout";
import { CommentCard } from "../../../components/ui/comment-card";
import { useGetReviewsByUser } from "../../../features/reviews/api/get-reviews-by-user";
import { ErrorMessage } from "../../../components/errors/error-message";
import LoadingIndicator from "../../../components/ui/loading-indicator";
import { useState } from "react";

function UserReviews() {
  const { userId } = useParams();
  const {
    data: reviews = [],
    isLoading,
    error,
  } = useGetReviewsByUser(userId ?? "");
  const [searchText, setSearchText] = useState<string>("");

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
        <div className="col-md-3"></div>
        {reviews.map((review) => (
          <div className="col-md" key={review.id}>
            <CommentCard
              item={review.itemId}
              rating={review.rating}
              date={new Date(review.date).toLocaleString([], {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
              comment={review.comment ?? ""}
            />
            <hr />
          </div>
        ))}
        <div className="col-md-3"></div>
      </div>
    </MainLayout>
  );
}

export default UserReviews;
