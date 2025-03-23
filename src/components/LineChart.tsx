import { FC } from "react";
import { Line } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { ChartProps } from "../common/interfaces";

Chart.register(ArcElement, Tooltip, Legend);

const LineChart: FC<ChartProps> = ({ data, options, className }) => {
  return <div className={className}><Line data={data} options={options} /></div>;
};

export default LineChart;
