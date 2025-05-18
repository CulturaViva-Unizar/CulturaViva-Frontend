import React from "react";
import { Select } from "../../../components/ui/select";
import { TIMEFRAME_SELECT_OPTIONS } from "../../../shared/constants/select-options";
import { Timeframe } from "../../../shared/types/enums";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  value: Timeframe;
  onChange: (newValue: Timeframe) => void;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  children,
  className = "",
  value,
  onChange,
}) => {
  return (
    <div className={`card ${className}`}>
      <div className="card-header d-flex align-items-center justify-content-between">
        <h5 className="mb-0">{title}</h5>
        <Select
          options={TIMEFRAME_SELECT_OPTIONS}
          value={value}
          onChange={onChange}
          className="shadow-sm"
        />
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default ChartCard;
