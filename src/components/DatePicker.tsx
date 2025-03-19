import React, { FC, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  onChange?: (date: Date | null) => void;
}

export const DatePicker: FC<DatePickerProps> = ({
  onChange
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
      className="input-group"
      style={{
        borderRadius: '9999px',
        boxShadow: '0 0px 4px rgba(0,0,0,0.2)'
      }}
    >
      <ReactDatePicker
        selected={selectedDate}
        onChange={handleChange}
        placeholderText='dd/mm/aaaa'
        dateFormat="dd/MM/yyyy"
        className="form-control border-0"
      />
      <span
        className="input-group-text border-0"
        style={{
          borderRadius: '9999px'
        }}
      >
        <FontAwesomeIcon icon={faCalendar} />
      </span>
    </div>
  );
};
