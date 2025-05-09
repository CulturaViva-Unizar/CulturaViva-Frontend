import { FC, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  onChange?: (date: Date | null) => void;
  className?: string;
}

export const DatePicker: FC<DatePickerProps> = ({
  onChange,
  className = "",
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <div
      className={`d-flex align-items-center rounded-pill px-3 gap-2 ${className}`}
    >
      <ReactDatePicker
        selected={selectedDate}
        onChange={handleChange}
        placeholderText="dd/mm/aaaa"
        dateFormat="dd/MM/yyyy"
        className="border-0"
      />
      <FontAwesomeIcon icon={faCalendar} />
    </div>
  );
};
