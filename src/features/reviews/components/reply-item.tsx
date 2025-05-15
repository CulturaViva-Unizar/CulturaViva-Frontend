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
import { Link } from "react-router";
import { useUser } from "../../../lib/auth";
import { paths } from "../../../config/paths";
import { GetRepliesRequest } from "../../../types/api";
import { useGetRepliesByEvent } from "../api/get-replies-by-event";
import { ErrorMessage } from "../../../components/errors/error-message";
import LoadingIndicator from "../../../components/ui/loading-indicator";

type ReplyItemProps = {
  id: string;
  itemId: string;
  userId: string;
  username: string;
  comment: string;
  date: string;
  onReply: (commentId: string) => void;
  onDelete: (commentId: string) => void;
};

export const ReplyItem: React.FC<ReplyItemProps> = ({
  id,
  itemId,
  userId,
  username,
  comment,
  date,
  onReply,
  onDelete,
}) => {
  const user = useUser();
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

  if (isLoading && !error) {
    return (
      <LoadingIndicator message="Cargando respuestas de los comentarios..." />
    );
  }

  if (error) {
    return (
      <ErrorMessage message="Error cargando las respuestas de los comentarios" />
    );
  }

  return (
    <div className="ms-4 px-2 border-start">
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
            onClick={() => onDelete(id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
      <span className="text-muted small">
        {new Date(date).toLocaleString([], {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })}
      </span>
      <p className="mb-2">{comment}</p>
      {user.data && user.data.id !== userId && (
        <button className="btn btn-sm mt-2" onClick={() => onReply(id)}>
          <FontAwesomeIcon icon={faReply} className="me-2" />{" "}
          {user.data
            ? "Responder"
            : "Necesita iniciar sesión para poder responder"}
        </button>
      )}
      {replies &&
        replies.map((childReply) => (
          <ReplyItem
            key={childReply.id}
            id={childReply.id}
            itemId={id}
            userId={userId}
            username={childReply.username}
            comment={childReply.comment}
            date={childReply.date}
            onReply={onReply}
            onDelete={onDelete}
          />
        ))}
    </div>
  );
};
