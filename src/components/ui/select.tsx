import { FC, ChangeEvent } from "react";
import { SelectOption } from "../../shared/types/models";

type SelectProps = {
  options: SelectOption[];
  placeholder?: string;
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
};

export const Select: FC<SelectProps> = ({
  options,
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      className={`form-select border-0 rounded-pill w-auto text-capitalize ${className}`}
      value={value}
      onChange={handleChange}
      role="button"
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="text-capitalize">
          {opt.label}
        </option>
      ))}
    </select>
  );
};
