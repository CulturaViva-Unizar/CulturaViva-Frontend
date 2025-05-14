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
import { useUser } from "../../../lib/auth";
import { paths } from "../../../config/paths";

export const ReplyItem: React.FC<ReplyProps> = ({
  userId,
  username,
  comment,
  date,
  replies,
  onReply,
  onDelete,
}) => {
  const user = useUser();

  return (
    <div className="ms-4 px-2 border-start">
      <div className="d-flex align-items-center gap-2">
        <FontAwesomeIcon icon={faCircleUser} />
        <strong>{username}</strong>
        <Link to={paths.app.chats.getHref()} className="btn btn-light rounded-circle">
          <FontAwesomeIcon icon={faComment} />
        </Link>
        {user.data?.rol === ADMIN_ROLE && (
          <button
            className="btn btn-sm btn-danger rounded-circle"
            onClick={() =>
              onDelete({
                userId,
                username,
                comment,
                date,
                replies,
                onReply,
                onDelete,
              })
            }
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
      <span className="text-muted small">{date}</span>
      <p className="mb-2">{comment}</p>
      <button
        className="btn btn-sm"
        onClick={() =>
          onReply({
            userId,
            username,
            comment,
            date,
            replies,
            onReply,
            onDelete,
          })
        }
      >
        <FontAwesomeIcon icon={faReply} className="me-2" /> Responder
      </button>
      {replies &&
        replies.map((childReply, index) => (
          <ReplyItem
            key={index}
            {...childReply}
            onReply={onReply}
            onDelete={onDelete}
          />
        ))}
    </div>
  );
};
