import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { RatingStars } from "./rating-stars";
import { useDeleteReviewFromCulturalPlace } from "../api/delete-review-from-cultural-place";
import { useDeleteReviewFromEvent } from "../api/delete-review-from-event";
import { Items } from "../../../shared/types/enums";

interface CommentCardProps {
  id: string;
  itemId: string;
  itemTitle: string;
  itemType: string;
  rating?: number;
  date: string;
  comment: string;
  deleted: boolean;
}

export const CommentCard: React.FC<CommentCardProps> = ({
  id,
  itemId,
  itemTitle,
  itemType,
  rating,
  comment,
  date,
  deleted,
}) => {
  const deleteCommentFromEventMutation = useDeleteReviewFromEvent();
  const deleteCommentFromCulturalPlaceMutation =
    useDeleteReviewFromCulturalPlace();

  const deleteCommentFromEvent = () => {
    deleteCommentFromEventMutation.mutate(
      { eventId: itemId, commentId: id },
      {
        onSuccess: () => {
          Swal.fire("Eliminado", "Comentario eliminado.", "success");
        },
        onError: (err) => {
          Swal.fire("Error", err.message, "error");
        },
      }
    );
  };

  const deleteCommentFromCulturalPlace = () => {
    deleteCommentFromCulturalPlaceMutation.mutate(
      { culturalPlaceId: itemId, commentId: id },
      {
        onSuccess: () => {
          Swal.fire("Eliminado", "Comentario eliminado.", "success");
        },
        onError: (err) => {
          Swal.fire("Error", err.message, "error");
        },
      }
    );
  };

  const handleDeleteComment = () => {
    Swal.fire({
      title: "¡ATENCIÓN!",
      text: "Se va a eliminar una reseña",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-danger ms-2",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        if (itemType == Items.Evento) {
          deleteCommentFromEvent();
        } else {
          deleteCommentFromCulturalPlace();
        }
      }
    });
  };

  return (
    <div
      style={deleted ? { backgroundColor: "#ff000022" } : {}}
      className={`${deleted && "text-muted"}`}
    >
      <div className="d-flex align-items-center justify-content-between gap-2">
        <h2>{itemTitle}</h2>
        {!deleted && (
          <button
            className="btn btn-sm btn-danger rounded-circle"
            onClick={handleDeleteComment}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
      <div className="mb-2 d-flex">
        {rating && <RatingStars rating={rating} className="me-2" />}
        <span className="text-muted">{date}</span>
      </div>
      <p>{comment}</p>
    </div>
  );
};
