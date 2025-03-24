import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Link } from "react-router";

interface ChatCardProps {
  userId: number;
  username: string;
  lastMessage: string;
  date: string;
  unreadMessages: number;
}

export const ChatCard: FC<ChatCardProps> = ({
  userId,
  username,
  lastMessage,
  date,
  unreadMessages,
}) => {
  return (
    <Link
      to={`/chats/${userId}`}
      className="dropdown-item btn d-flex align-items-center p-2"
    >
      <div className="col-1">
        <FontAwesomeIcon icon={faUser} />
      </div>
      <div className="col-8">
        <p className="fw-bold mb-0">{username}</p>
        <p className="small text-muted mb-0 text-truncate">{lastMessage}</p>
      </div>
      <div className="col-3 d-flex flex-column align-items-end">
        <p className="small text-muted mb-1">{date}</p>
        {unreadMessages > 0 && (
          <span className="badge bg-danger rounded-circle float-end">
            {unreadMessages}
          </span>
        )}
      </div>
    </Link>
  );
};
