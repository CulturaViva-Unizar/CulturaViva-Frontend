import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faReply,
  faCircleUser,
  faComment,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Link, useNavigate } from "react-router";
import { Reply, ReviewProps } from "../common/interfaces";
import { useAuth } from "../context/AuthContext";
import { ADMIN_ROLE, GUEST_ROLE } from "../common/constants";

export const Review: React.FC<ReviewProps> = ({
  userId,
  username,
  rating = 0,
  comment,
  date,
  replies = [],
}) => {
  const [allReplies, setAllReplies] = useState<Reply[]>(replies);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
    if (user?.role === GUEST_ROLE) {
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
        const newReply: Reply = {
          userId: userId,
          user: "Tú",
          comment: result.value,
          date: "hace un momento",
          replies: [],
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

  const renderReplies = (replies: Reply[]) => {
    return replies.map((reply, index) => (
      <div key={index} className="ms-4 p-2 border-start">
        <div className="d-flex align-items-center gap-2">
          <FontAwesomeIcon icon={faCircleUser} />
          <strong>{reply.user}</strong>
          <Link
            to={`/chats/${reply.userId}`}
            className="btn btn-light rounded-circle"
          >
            <FontAwesomeIcon icon={faComment} />
          </Link>
          {user?.role === ADMIN_ROLE && (
            <button
              className="btn btn-sm"
              onClick={() => handleDeleteComment()}
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="btn btn-danger rounded-circle"
              />
            </button>
          )}
        </div>
        <span className="text-muted small">{reply.date}</span>
        <p>{reply.comment}</p>
        <div>
          <button className="btn btn-sm" onClick={() => handleReply(reply)}>
            <FontAwesomeIcon icon={faReply} className="me-2" /> Responder
          </button>
        </div>
        {reply.replies && renderReplies(reply.replies)}
      </div>
    ));
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
          <button className="btn btn-sm" onClick={() => handleDeleteComment()}>
            <FontAwesomeIcon
              icon={faTrash}
              className="btn btn-danger rounded-circle"
            />
          </button>
        )}
      </div>
      <div className="mb-2">
        {[...Array(5)].map((_, i) => (
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            className={i < rating ? "text-warning" : "text-secondary"}
          />
        ))}
        <span className="text-muted ms-2">{date}</span>
      </div>
      <p>{comment}</p>
      {renderReplies(allReplies)}
      <div>
        <button className="btn btn-sm" onClick={() => handleReply()}>
          <FontAwesomeIcon icon={faReply} className="me-2" /> Responder
        </button>
      </div>
    </div>
  );
};
