import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import React, { FC, useState, ChangeEvent } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  placeholder?: string;
  onChange?: (newValue: string) => void;
  className?: string;
}

export const Select: FC<SelectProps> = ({
  options,
  placeholder = 'Seleccionar...',
  onChange,
  className = ''
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div
      className={`input-group ${className}`}
      style={{
        borderRadius: '9999px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '150px'
      }}
    >
      <select
        className="form-select border-0 p-0"
        style={{ borderRadius: '9999px' }}
        value={selectedValue}
        onChange={handleChange}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
