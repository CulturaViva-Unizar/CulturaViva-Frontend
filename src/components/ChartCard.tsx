import React from 'react';
import { Select } from './Select';

interface ChartCardProps {
  title: string
  children: React.ReactNode
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      <div className='card-header d-flex align-items-center justify-content-between'>
        <h5>{title}</h5>
        <Select
          options={[
            { value: "semana", label: "Última semana" },
            { value: "mes", label: "Último mes" },
            { value: "3meses", label: "Últimos 3 meses" },
            { value: "6meses", label: "Últimos 6 meses" },
            { value: "9meses", label: "Últimos 9 meses" },
            { value: "año", label: "Último año" },
          ]}
          initialValue="semana"
          onChange={(newValue) => console.log(newValue)}
        />
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
