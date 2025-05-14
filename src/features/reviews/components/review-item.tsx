import React, { useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReply,
  faCircleUser,
  faComment,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Link, useNavigate, useSearchParams } from "react-router";
import { RatingStars } from "../../../components/ui/rating-stars";
import { useLogout, useUser } from "../../../lib/auth";
import { paths } from "../../../config/paths";
import Swal from "sweetalert2";
import { Items } from "../../../shared/types/enums";
import { useDeleteReviewFromEvent } from "../api/delete-review-from-event";
import { useDeleteReviewFromCulturalPlace } from "../api/delete-review-from-cultural-place";
import { useCreateResponseToReview } from "../api/create-response";
import { useGetRepliesByEvent } from "../api/get-replies-by-event";
import { GetRepliesRequest } from "../../../types/api";
import LoadingIndicator from "../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../components/errors/error-message";
import { ReplyItem } from "./reply-item";
import { useGetChatsByUser } from "../../chats/api/get-chats-by-user";
import { Chat } from "../../chats/types/models";
import { usePostNewChatByUser } from "../../chats/api/post-new-chat-by-user";

type ReviewItemProps = {
  id: string;
  itemId: string;
  itemType: Items;
  userId: string;
  username: string;
  rating?: number;
  comment: string;
  date: string;
};

export const ReviewItem: React.FC<ReviewItemProps> = ({
  id,
  itemId,
  itemType,
  userId,
  username,
  rating = 0,
  comment,
  date,
}) => {
  const user = useUser();
  const logout = useLogout();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const {
    data: chats = [],
    isLoading: chatsLoading,
    isError: chatsError,
  } = useGetChatsByUser(user.data?.id ?? "");

  const {
    mutate: createChat,
    isPending: creatingChat,
  } = usePostNewChatByUser(user.data?.id ?? "");

  const handleNewChat = () => {
    if (!user.data || chatsLoading || chatsError) {
      return;
    }

    const existing = chats.find(
      (c: Chat) => c.user._id === userId
    );

    if (existing) {
      navigate(paths.app.chats.chat.getHref(existing.id));
    } else {
      createChat(
        { user: userId },
        {
          onSuccess: (newChat) => {
            navigate(paths.app.chats.chat.getHref(newChat.id));
          },
        }
      );
    }
  };
  const deleteReviewFromEventMutation = useDeleteReviewFromEvent();
  const deleteReviewFromCulturalPlaceMutation =
    useDeleteReviewFromCulturalPlace();
  const createResponseToReviewMutation = useCreateResponseToReview();
  const request: GetRepliesRequest = useMemo(
    () => ({
      itemId,
      commentId: id,
    }),
    [id, itemId]
  );
  const {
    data: replies = [],
    isLoading,
    error,
  } = useGetRepliesByEvent(request);

  const handleReply = (commentId: string) => {
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
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        await createResponseToReviewMutation.mutateAsync({
          itemId,
          itemType,
          commentId,
          data: {
            text: result.value,
          },
        });
      }
    });
  };

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
          deleteReviewFromEvent();
        } else {
          deleteReviewFromCulturalPlace();
        }
      }
    });
  };

  const handleDeleteReply = () => {
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
          deleteReplyFromEvent();
        } else {
          deleteReplyFromCulturalPlace();
        }
      }
    });
  };

  if (isLoading && !error) {
    return <LoadingIndicator message="Cargando respuestas de las reseñas..." />;
  }

  if (error) {
    return (
      <ErrorMessage message="Error cargando las respuestas de las reseñas" />
    );
  }

  return (
    <div className="mb-3">
      <div className="d-flex align-items-center gap-2">
        <FontAwesomeIcon icon={faCircleUser} />
        <strong>{username}</strong>
        {user.data && user.data.id !== userId && (
        <button
          onClick={handleNewChat}
          disabled={creatingChat || chatsLoading || chatsError}
          className="btn btn-light rounded-circle"
        >
          <FontAwesomeIcon icon={faComment} />
        </button>
        )}
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
      {replies && replies.map((reply, index) => (
        <ReplyItem key={index} {...reply} onReply={() => handleReply()} onDelete={handleDeleteReply} />
      ))}
      <button className="btn btn-sm mt-2" onClick={() => handleReply(id)}>
        <FontAwesomeIcon icon={faReply} className="me-2" /> Responder
      </button>
    </div>
  );
};
