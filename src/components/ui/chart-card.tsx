import React from "react";
import { Select } from "./select";
import { TIMEFRAME_SELECT_OPTIONS } from "../../shared/constants/select-options";
import { Timeframe } from "../../shared/types/enums";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  children,
  className = "",
}) => {
  return (
    <div className={`card ${className}`}>
      <div className="card-header d-flex align-items-center justify-content-between">
        <h5 className="mb-0">{title}</h5>
        <Select
          options={TIMEFRAME_SELECT_OPTIONS}
          initialValue={Timeframe.Semana}
          onChange={(newValue) => console.log(newValue)}
        />
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default ChartCard;
