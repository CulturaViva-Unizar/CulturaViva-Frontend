import { FC } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart: FC<ChartProps> = ({ data, options, className }) => {
  return (
    <div className={className}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
