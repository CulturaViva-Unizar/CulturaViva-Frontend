import { FC } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { ChartProps } from "../common/interfaces";

Chart.register(ArcElement, Tooltip, Legend);

const BarChart: FC<ChartProps> = ({ data, options, className }) => {
  return <div className={className}><Bar data={data} options={options} /></div>;
};

export default BarChart;
