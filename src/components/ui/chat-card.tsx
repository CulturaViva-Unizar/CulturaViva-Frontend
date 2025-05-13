import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Link } from "react-router";

interface ChatCardProps {
  username: string;
  to?: string;
  active: boolean;
}

export const ChatCard: FC<ChatCardProps> = ({
  username,
  to,
  active = false
}) => {
  const CardContent = (
    <div
      className={`d-flex align-items-center p-3 border-bottom ${
        active ? "bg-dark text-white" : "bg-light text-dark"
      }`}
      style={{ cursor: "pointer" }}
    >
      <div className="col-1">
        <FontAwesomeIcon icon={faUser} />
      </div>
      <div className="col-8">
        <strong>{username}</strong>
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
