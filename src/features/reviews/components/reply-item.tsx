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
import { useUser } from "../../../lib/auth";
import { paths } from "../../../config/paths";
import { GetRepliesRequest } from "../../../types/api";
import { useGetRepliesByEvent } from "../api/get-replies-by-event";
import { ErrorMessage } from "../../../components/errors/error-message";
import LoadingIndicator from "../../../components/ui/loading-indicator";
import { useGetChatsByUser } from "../../chats/api/get-chats-by-user";
import { usePostNewChatByUser } from "../../chats/api/post-new-chat-by-user";
import { Chat } from "../../chats/types/models";
import { useNavigate } from "react-router";
import { formatDate } from "../../../utils/date";

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
  const navigate = useNavigate();
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
            onClick={() => onDelete(id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
      <span className="text-muted small">{formatDate(date)}</span>
      <p className="mb-2">{comment}</p>
      {user.data && user.data.id !== userId && (
        <button className="btn btn-sm mt-2" onClick={() => onReply(id)}>
          <FontAwesomeIcon icon={faReply} className="me-2" /> Responder
        </button>
      )}
      {replies &&
        replies.map((childReply) => (
          <ReplyItem
            key={childReply.id}
            id={childReply.id}
            itemId={id}
            userId={childReply.userId}
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
