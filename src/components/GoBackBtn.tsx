import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface GoBackBtnProps {
  className?: string;
}

export const GoBackBtn: FC<GoBackBtnProps> = ({ className = "" }) => {
  return (
    <button
      className={`btn btn-light rounded-circle h-100 shadow-sm ${className}`}
      type="button"
      onClick={() => window.history.back()}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
};
