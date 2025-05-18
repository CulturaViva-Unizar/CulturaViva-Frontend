import { FC } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { ChartProps } from "../../features/analytics/types/models";

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart: FC<ChartProps> = ({ data, options, className }) => {
  return (
    <div className={`d-flex justify-content-center ${className}`} style={{maxHeight: 320}}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
