import { FC } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const PieChart: FC<ChartProps> = ({ data, options, className }) => {
  return (
    <div className={className}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
