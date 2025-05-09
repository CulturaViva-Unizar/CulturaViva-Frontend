import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Link } from "react-router";

interface ChatCardProps {
  username: string;
  lastMessage: string;
  date: string;
  unreadMessages: number;
  to?: string;
}

export const ChatCard: FC<ChatCardProps> = ({
  username,
  lastMessage,
  date,
  unreadMessages,
  to,
}) => {
  const CardContent = (
    <div
      className="d-flex align-items-center py-3 border-bottom"
      style={{ cursor: "pointer" }}
    >
      <div className="col-1">
        <FontAwesomeIcon icon={faUser} />
      </div>
      <div className="col-8">
        <strong>{username}</strong>
        <p className="small text-muted mb-0 text-truncate">{lastMessage}</p>
      </div>
      <div className="col-3 text-end">
        <p className="small text-muted mb-0">{date}</p>
        {unreadMessages > 0 && (
          <span className="badge bg-danger rounded-circle">
            {unreadMessages}
          </span>
        )}
      </div>
    </div>
  );

  return to ? (
    <Link to={to} className="text-decoration-none text-dark">
      {CardContent}
    </Link>
  ) : (
    CardContent
  );
};
