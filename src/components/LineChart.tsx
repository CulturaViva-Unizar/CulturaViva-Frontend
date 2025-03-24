import { FC } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { ChartProps } from "../common/interfaces";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const LineChart: FC<ChartProps> = ({ data, options, className }) => {
  return (
    <div className={className}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
