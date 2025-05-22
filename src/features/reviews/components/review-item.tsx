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
import { useNavigate } from "react-router";
import { RatingStars } from "./rating-stars";
import { useUser } from "../../../lib/auth";
import { paths } from "../../../config/paths";
import Swal from "sweetalert2";
import { Items } from "../../../shared/types/enums";
import { useDeleteReviewFromEvent } from "../api/delete-review-from-event";
import { useDeleteReviewFromCulturalPlace } from "../api/delete-review-from-cultural-place";
import { useCreateResponse } from "../api/create-response";
import { useGetRepliesByEvent } from "../api/get-replies-by-event";
import { GetRepliesRequest } from "../../../types/api";
import LoadingIndicator from "../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../components/errors/error-message";
import { ReplyItem } from "./reply-item";
import { useGetChatsByUser } from "../../chats/api/get-chats-by-user";
import { Chat } from "../../chats/types/models";
import { usePostNewChatByUser } from "../../chats/api/post-new-chat-by-user";
import { formatDate } from "../../../utils/date";

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
  const navigate = useNavigate();

  const {
    data: chats = [],
    isLoading: chatsLoading,
    isError: chatsError,
  } = useGetChatsByUser(user.data?.id ?? "");

  const { mutate: createChat, isPending: creatingChat } = usePostNewChatByUser(
    user.data?.id ?? ""
  );

  const handleNewChat = () => {
    if (!user.data || chatsLoading || chatsError) {
      return;
    }

    const existing = chats.find((c: Chat) => c.user.id === userId);

    if (existing) {
      navigate(paths.app.chats.chat.getHref(existing.id), {
        state: { username: existing.user.name },
      });
    } else {
      createChat(
        { user: userId },
        {
          onSuccess: (newChat) => {
            navigate(paths.app.chats.chat.getHref(newChat.id), {
              state: { username }
            });
          },
        }
      );
    }
  };
  const deleteCommentFromEventMutation = useDeleteReviewFromEvent();
  const deleteCommentFromCulturalPlaceMutation =
    useDeleteReviewFromCulturalPlace();
  const createResponseToCommentMutation = useCreateResponse();
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
    const offcanvasEl = document.querySelector(".offcanvas.show");
    if (offcanvasEl) offcanvasEl.setAttribute("inert", "");

    Swal.fire({
      title: "Responder a la reseña",
      input: "text",
      inputPlaceholder: "Escribe tu respuesta...",
      showCancelButton: true,
      confirmButtonText: "Enviar",
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        await createResponseToCommentMutation.mutateAsync({
          itemId,
          itemType,
          commentId,
          data: {
            text: result.value,
          },
        });
        Swal.fire({
          title: "¡Gracias!",
          text: "Tu respuesta ha sido enviada.",
          icon: "success",
          timer: 1500,
        });
      }
    });
  };

  const deleteCommentFromEvent = (commentId: string, motivo: string) => {
    deleteCommentFromEventMutation.mutate(
      { eventId: itemId, motivo, commentId },
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

  const deleteCommentFromCulturalPlace = (
    commentId: string,
    motivo: string
  ) => {
    deleteCommentFromCulturalPlaceMutation.mutate(
      { culturalPlaceId: itemId, motivo, commentId },
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

  const handleDeleteComment = (commentId: string) => {
    const offcanvasEl = document.querySelector(".offcanvas.show");
    if (offcanvasEl) offcanvasEl.setAttribute("inert", "");

    Swal.fire({
      title: "¡ATENCIÓN!",
      text: "Se va a eliminar una reseña",
      icon: "warning",
      input: "text",
      inputPlaceholder: "Escribe el motivo...",
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
          deleteCommentFromEvent(commentId, result.value);
        } else {
          deleteCommentFromCulturalPlace(commentId, result.value);
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
            onClick={() => handleDeleteComment(id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
      <div className="mb-2">
        <RatingStars rating={rating} />
        <span className="text-muted ms-2">{formatDate(date)}</span>
      </div>
      <p>{comment}</p>
      {replies &&
        replies.map((reply) => (
          <ReplyItem
            key={reply.id}
            id={reply.id}
            itemId={itemId}
            userId={reply.userId}
            username={reply.username}
            comment={reply.comment}
            date={reply.date}
            onReply={handleReply}
            onDelete={handleDeleteComment}
          />
        ))}
      {!user.data ? (
        <button className="btn btn-sm mt-2" disabled>
          <FontAwesomeIcon icon={faReply} className="me-2" /> Necesita iniciar
          sesión para poder responder
        </button>
      ) : (
        <button className="btn btn-sm mt-2" onClick={() => handleReply(id)}>
          <FontAwesomeIcon icon={faReply} className="me-2" /> Responder
        </button>
      )}
    </div>
  );
};
