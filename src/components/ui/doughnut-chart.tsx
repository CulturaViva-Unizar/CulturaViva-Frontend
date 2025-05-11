import { FC } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart: FC<ChartProps> = ({ data, options, className }) => {
  return (
    <div className={className}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
