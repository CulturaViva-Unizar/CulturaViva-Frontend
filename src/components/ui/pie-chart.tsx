import { FC } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { ChartProps } from "../../features/analytics/types/models";

Chart.register(ArcElement, Tooltip, Legend);

const PieChart: FC<ChartProps> = ({ data, options, className }) => {
  return (
    <div className={className} style={{ position: 'relative' }}>
      <div className="rounded-circle shadow overflow-hidden">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
