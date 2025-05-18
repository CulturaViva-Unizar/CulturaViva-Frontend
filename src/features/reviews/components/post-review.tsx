import { FC, useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { RatingStars } from "./rating-stars";
import { useCreateReview } from "../api/create-review";
import { Items } from "../../../shared/types/enums";

type PostReviewProps = {
  itemId: string;
  itemType: Items;
};

const PostReview: FC<PostReviewProps> = ({ itemId, itemType }) => {
  const [myRating, setMyRating] = useState(0);
  const [myComment, setComment] = useState("");

  const createReviewMutation = useCreateReview();

  const handleStarClick = (index: number) => {
    setMyRating(index + 1);
  };

  const handleReviewSubmit = async () => {
    if (myRating === 0) {
      Swal.fire("Error", "La reseña debe tener una puntuación.", "error");
      return;
    }

    await createReviewMutation.mutateAsync({
      itemId,
      itemType,
      data: {
        text: myComment,
        value: myRating,
      },
    });

    setMyRating(0);
    setComment("");
    Swal.fire("¡Gracias!", "Tu reseña ha sido añadida.", "success");
  };

  return (
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
  );
};

export default PostReview;
