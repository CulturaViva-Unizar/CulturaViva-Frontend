import { faArrowDownWideShort, faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Button } from "react-bootstrap";

type SortButtonProps = {
  label: string;
  sortBy: string;
  onClick: () => void;
  className?: string;
};

export const SortButton: FC<SortButtonProps> = ({ label, sortBy, onClick, className }) => {
  return (
    <Button
      variant="light"
      className={`rounded-pill shadow-sm w-auto ${className}`}
      onClick={onClick}
    >
      {label}
      <FontAwesomeIcon icon={sortBy == "" || sortBy == "desc" ? faArrowDownWideShort : faArrowUpWideShort} className="ps-2" />
    </Button>
  );
};
