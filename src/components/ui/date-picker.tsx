import { FC } from "react";
import ReactDatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  value: Date | null;
  onChange?: (date: Date | null) => void;
  className?: string;
}

export const DatePicker: FC<DatePickerProps> = ({
  value,
  onChange,
  className = "",
}) => {
  return (
    <div
      className={`d-flex align-items-center rounded-pill px-3 gap-2 ${className}`}
    >
      <ReactDatePicker
        selected={value}
        onChange={onChange}
        placeholderText="dd/mm/aaaa"
        dateFormat="dd/MM/yyyy"
        className="border-0"
      />
      <FontAwesomeIcon icon={faCalendar} />
    </div>
  );
};
