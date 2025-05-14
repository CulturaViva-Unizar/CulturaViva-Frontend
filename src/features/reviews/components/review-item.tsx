import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReply,
  faCircleUser,
  faComment,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Link } from "react-router";
import { RatingStars } from "../../../components/ui/rating-stars";
import { useUser } from "../../../lib/auth";
import { paths } from "../../../config/paths";
import Swal from "sweetalert2";
import { Items } from "../../../shared/types/enums";
import { useDeleteReviewFromEvent } from "../api/delete-review-from-event";
import { useDeleteReviewFromCulturalPlace } from "../api/delete-review-from-cultural-place";

type ReviewItemProps = {
  id: string;
  itemId: string;
  itemType: Items;
  username: string;
  rating?: number;
  comment: string;
  date: string;
};

export const ReviewItem: React.FC<ReviewItemProps> = ({
  id,
  itemId,
  itemType,
  username,
  rating = 0,
  comment,
  date,
}) => {
  const user = useUser();
  const deleteReviewFromEventMutation = useDeleteReviewFromEvent();
  const deleteReviewFromCulturalPlaceMutation =
    useDeleteReviewFromCulturalPlace();

  /*
  const addReply = (
    replyList: Reply[],
    parentReply: Reply,
    newReply: Reply
  ): Reply[] => {
    return replyList.map((reply) => {
      if (reply === parentReply) {
        return { ...reply, replies: [...(reply.replies || []), newReply] };
      } else if (reply.replies) {
        return {
          ...reply,
          replies: addReply(reply.replies, parentReply, newReply),
        };
      }
      return reply;
    });
  };

  const handleReply = (parentReply?: Reply) => {
    if (!user.data) {
      logout.mutate(undefined);
      navigate(paths.auth.login.getHref(redirectTo));
      return;
    }

    Swal.fire({
      title: "Responder a la reseña",
      input: "text",
      inputPlaceholder: "Escribe tu respuesta...",
      showCancelButton: true,
      confirmButtonText: "Enviar",
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const newReply: Reply = {
          userId: user.data!.id,
          username: "Tú",
          comment: result.value,
          date: "hace un momento",
          replies: [],
          onReply: handleReply,
          onDelete: handleDeleteComment,
        };

        setAllReplies((prevReplies) => {
          if (parentReply) {
            return addReply(prevReplies, parentReply, newReply);
          } else {
            return [...prevReplies, newReply];
          }
        });
      }
    });
  };
  */

  const deleteReviewFromEvent = () => {
    deleteReviewFromEventMutation.mutate(
      { eventId: itemId, commentId: id },
      {
        onSuccess: () => {
          Swal.fire("Eliminado", "Reseña eliminada.", "success");
        },
        onError: (err) => {
          Swal.fire("Error", err.message, "error");
        },
      }
    );
  };

  const deleteReviewFromCulturalPlace = () => {
    deleteReviewFromCulturalPlaceMutation.mutate(
      { culturalPlaceId: itemId, commentId: id },
      {
        onSuccess: () => {
          Swal.fire("Eliminado", "Reseña eliminada.", "success");
        },
        onError: (err) => {
          Swal.fire("Error", err.message, "error");
        },
      }
    );
  };

  const handleDeleteReview = () => {
    Swal.fire({
      title: "¡ATENCIÓN!",
      text: "Se va a eliminar un comentario",
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
          deleteReviewFromEvent();
        } else {
          deleteReviewFromCulturalPlace();
        }
      }
    });
  };

  return (
    <div className="mb-3">
      <div className="d-flex align-items-center gap-2">
        <FontAwesomeIcon icon={faCircleUser} />
        <strong>{username}</strong>
        <Link
          to={paths.app.chats.getHref()}
          className="btn btn-light rounded-circle"
        >
          <FontAwesomeIcon icon={faComment} />
        </Link>
        {user.data?.admin && (
          <button
            className="btn btn-sm btn-danger rounded-circle"
            onClick={handleDeleteReview}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
      <div className="mb-2">
        <RatingStars rating={rating} />
        <span className="text-muted ms-2">
          {new Date(date).toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })}
        </span>
      </div>
      <p>{comment}</p>
      <button className="btn btn-sm mt-2">
        <FontAwesomeIcon icon={faReply} className="me-2" /> Responder
      </button>
    </div>
  );
};
