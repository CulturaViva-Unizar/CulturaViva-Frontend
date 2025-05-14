import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReply,
  faCircleUser,
  faComment,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Link, useNavigate, useSearchParams } from "react-router";
import { RatingStars } from "../../../components/ui/rating-stars";
import { useLogout, useUser } from "../../../lib/auth";
import { paths } from "../../../config/paths";
import { Reply } from "../types/models";
import { useGetChatsByUser } from "../../chats/api/get-chats-by-user";
import { Chat } from "../../chats/types/models";
import { usePostNewChatByUser } from "../../chats/api/post-new-chat-by-user";

type ReviewItemProps = {
  userId: string;
  username: string;
  rating?: number;
  comment: string;
  date: string;
  replies?: Reply[];
};

export const ReviewItem: React.FC<ReviewItemProps> = ({
  userId,
  username,
  rating = 0,
  comment,
  date,
  replies = [],
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

    console.log(chats);
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

  const handleDeleteComment = (parentReply?: Reply) => {
    Swal.fire({
      title: "¡ATENCIÓN!",
      html: `
        <p>Se va a eliminar un comentario del evento</p>
        <select id="reasonSelect" class="form-select mt-3">
          <option value="">Motivo</option>
          <option value="razon1">Razón 1</option>
          <option value="razon2">Razón 2</option>
          <option value="razon3">Razón 3</option>
        </select>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-danger ms-2",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
      preConfirm: () => {
        const selectElement = document.getElementById(
          "reasonSelect"
        ) as HTMLSelectElement;
        const selectedValue = selectElement.value;
        if (!selectedValue) {
          Swal.showValidationMessage("Por favor, selecciona un motivo");
        }
        return { reason: selectedValue };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (parentReply) {
          setAllReplies((prevReplies) => {
            return prevReplies
              .map((reply) => {
                if (reply === parentReply) {
                  return null;
                } else if (reply.replies) {
                  const updatedReplies = reply.replies.filter(
                    (r) => r !== parentReply
                  );
                  if (updatedReplies.length !== reply.replies.length) {
                    return { ...reply, replies: updatedReplies };
                  }
                }
                return reply;
              })
              .filter((reply) => reply !== null) as Reply[];
          });
        } else {
          setAllReplies((prevReplies) =>
            prevReplies.filter((reply) => reply.comment !== comment)
          );
        }
      }
    });
  };
  */

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
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
      <div className="mb-2">
        <RatingStars rating={rating} />
        <span className="text-muted ms-2">{date}</span>
      </div>
      <p>{comment}</p>
      <button className="btn btn-sm mt-2" >
        <FontAwesomeIcon icon={faReply} className="me-2" /> Responder
      </button>
    </div>
  );
};
