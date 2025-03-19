import React, { FC, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  onChange?: (date: Date | null) => void;
  className?: string;
}

export const DatePicker: FC<DatePickerProps> = ({
  onChange,
  className = ''
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
      className={`d-flex align-items-center px-3 ${className}`}
      style={{
        borderRadius: '9999px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <ReactDatePicker
        selected={selectedDate}
        onChange={handleChange}
        placeholderText='dd/mm/aaaa'
        dateFormat="dd/MM/yyyy"
        className="border-0"
      />
    <FontAwesomeIcon icon={faCalendar} className=''/>
    </div>
  );
};
