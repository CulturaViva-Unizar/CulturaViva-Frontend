import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useNavigate } from "react-router";
import { paths } from "../../config/paths";

interface GoBackBtnProps {
  className?: string;
  onClick?: () => void;
}

export const GoBackBtn: FC<GoBackBtnProps> = ({
  className = "",
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = onClick ?? (() => navigate(paths.home.getHref()));

  return (
    <button
      className={`btn btn-light rounded-circle h-100 shadow-sm ${className}`}
      type="button"
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
};
