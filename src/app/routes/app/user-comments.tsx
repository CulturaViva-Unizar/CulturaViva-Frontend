import { useParams } from "react-router";
import SearchBar from "../../../components/ui/search-bar";
import MainLayout from "../../../components/layouts/main-layout";
import { CommentCard } from "../../../components/ui/comment-card";
import { useGetReviewsByUser } from "../../../features/reviews/api/get-reviews-by-user";
import { ErrorMessage } from "../../../components/errors/error-message";
import LoadingIndicator from "../../../components/ui/loading-indicator";
import { useState } from "react";

function UserComments() {
  const { userId } = useParams();
  const { data: reviews = [], isLoading, error } = useGetReviewsByUser(userId ?? "");
  const [searchText, setSearchText] = useState<string>("");

  if (isLoading && !error) {
    return <LoadingIndicator message="Cargando comentarios..." />;
  }

  if (error) {
    return <ErrorMessage message="Error al cargar los comentarios" />;
  }

  return (
    <MainLayout title={`Comentarios de User ${userId}`}>
      <div className="mt-3 mb-5 d-flex flex-column align-items-start align-items-md-center justify-content-center">
        <div className="col-12 col-md-5">
          <SearchBar value={searchText} onSearch={setSearchText} />
        </div>
      </div>
      {reviews.map((review, i) => (
        <div key={i}>
          <CommentCard
            item={review.itemId}
            rating={review.rating}
            date={review.date}
            comment={review.comment ?? ""}
          />
          <hr />
        </div>
      ))}
    </MainLayout>
  );
}

export default UserComments;
