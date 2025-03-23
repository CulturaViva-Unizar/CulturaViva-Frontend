import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faReply,
  faCircleUser,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Link } from "react-router";

type Reply = {
  userId: number;
  user: string;
  comment: string;
  date: string;
  replies?: Reply[];
};

type ReviewProps = {
  userId: number;
  user: string;
  rating?: number;
  comment: string;
  date: string;
  replies?: Reply[];
};

export const Review: React.FC<ReviewProps> = ({
  userId,
  user,
  rating = 0,
  comment,
  date,
  replies = [],
}) => {
  const [allReplies, setAllReplies] = useState<Reply[]>(replies);

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
        <strong>{user}</strong>
        <Link to={`/chats/${userId}`} className="btn btn-light rounded-circle">
          <FontAwesomeIcon icon={faComment} />
        </Link>
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
