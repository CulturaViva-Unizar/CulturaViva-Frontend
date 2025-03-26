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
import { Link, useNavigate } from "react-router";
import { ReplyProps, ReviewProps } from "../common/interfaces";
import { useAuth } from "../context/AuthContext";
import { ADMIN_ROLE } from "../common/constants";
import { RatingStars } from "./RatingStars";
import { Reply } from "./Reply";

export const Review: React.FC<ReviewProps> = ({
  userId,
  username,
  rating = 0,
  comment,
  date,
  replies = [],
}) => {
  const [allReplies, setAllReplies] = useState<ReplyProps[]>(replies);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const addReply = (
    replyList: ReplyProps[],
    parentReply: ReplyProps,
    newReply: ReplyProps
  ): ReplyProps[] => {
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

  const handleReply = (parentReply?: ReplyProps) => {
    if (!user?.role) {
      logout();
      navigate("/inicio-sesion");
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
        const newReply: ReplyProps = {
          userId: userId,
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

  const handleDeleteComment = (parentReply?: ReplyProps) => {
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
              .filter((reply) => reply !== null) as ReplyProps[];
          });
        } else {
          setAllReplies((prevReplies) =>
            prevReplies.filter((reply) => reply.comment !== comment)
          );
        }
      }
    });
  };

  return (
    <div className="mb-3">
      <div className="d-flex align-items-center gap-2">
        <FontAwesomeIcon icon={faCircleUser} />
        <strong>{username}</strong>
        <Link to={`/chats/${userId}`} className="btn btn-light rounded-circle">
          <FontAwesomeIcon icon={faComment} />
        </Link>
        {user?.role === ADMIN_ROLE && (
          <button
            className="btn btn-sm btn-danger rounded-circle"
            onClick={() => handleDeleteComment()}
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
      {allReplies.map((reply, index) => (
        <Reply key={index} {...reply} onReply={handleReply} onDelete={handleDeleteComment} />
      ))}
      <button className="btn btn-sm mt-2" onClick={() => handleReply()}>
        <FontAwesomeIcon icon={faReply} className="me-2" /> Responder
      </button>
    </div>
  );
};
