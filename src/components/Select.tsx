import React, { FC, useState, ChangeEvent } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  placeholder?: string;
  onChange?: (newValue: string) => void;
}

export const Select: FC<SelectProps> = ({
  options,
  placeholder = 'Seleccionar...',
  onChange,
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
      className="input-group"
      style={{
        borderRadius: '9999px',
        boxShadow: '0 0px 4px rgba(0,0,0,0.2)',
      }}
    >
      <select
        className="form-select border-0"
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
