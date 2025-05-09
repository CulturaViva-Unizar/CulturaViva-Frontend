import MainLayout from "../../../components/layouts/main-layout";
import ChartCard from "../../../components/ui/chart-card";
import { Select, SelectOption } from "../../../components/ui/select";
import BarChart from "../../../components/ui/bar-chart";
import LineChart from "../../../components/ui/line-chart";
import DoughnutChart from "../../../components/ui/doughnut-chart";
import { CATEGORY_SELECT_OPTIONS } from "../../../config/constants";

const labels = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

const barChartData = {
  labels: labels,
  datasets: [
    {
      data: [65, 59, 80, 81, 56, 55, 40, 30, 100, 82, 75, 66],
      backgroundColor: ["rgba(75, 192, 192, 0.2)"],
      borderColor: ["rgb(75, 192, 192)"],
      borderWidth: 1,
    },
  ],
};

const lineChartData = {
  labels: labels,
  datasets: [
    {
      data: [65, 59, 80, 81, 56, 55, 40, 30, 100, 82, 75, 66],
      borderColor: "rgb(75, 192, 192)",
    },
  ],
};

const doughnutChartData = {
  labels: ["Añadidos", "Eliminados"],
  datasets: [
    {
      data: [100, 30],
      backgroundColor: ["rgb(75, 192, 192)", "rgb(255, 99, 132)"],
      hoverOffset: 4,
    },
  ],
};

function Analytics() {
  const user_select_options: SelectOption[] = [
    { value: "", label: "Todos" },
    { value: "habilitados", label: "Habilitados" },
    { value: "deshabilitados", label: "Deshabilitados" },
  ];

  return (
    <MainLayout title="Analíticas">
      <div className="row g-4 mt-2">
        <div className="col-12 col-md-6">
          <ChartCard title={"Visitas de la web"}>
            <LineChart data={lineChartData} options={options} />
          </ChartCard>
        </div>
        <div className="col-12 col-md-6">
          <ChartCard title={"Eventos guardados"}>
            <BarChart data={barChartData} options={options} />
          </ChartCard>
        </div>
        <div className="col-12 col-md-4">
          <ChartCard title={"Comentarios añadidos vs. eliminados"}>
            <DoughnutChart data={doughnutChartData} options={doughnutOptions} />
          </ChartCard>
        </div>
        <div className="col-12 col-md-6">
          <ChartCard title={"Usuarios deshabilitados"}>
            <BarChart data={barChartData} options={options} />
          </ChartCard>
        </div>
        <div className="row flex-column col-12 col-md-2 pe-3">
          <div className="card p-0 ms-3 mt-4">
            <div className="card-header d-flex flex-column align-items-center justify-content-between py-3 gap-2">
              <h5>Usuarios totales</h5>
              <Select
                options={user_select_options}
                initialValue=""
                onChange={(newValue) => console.log(newValue)}
              />
            </div>
            <div className="card-body text-center">
              <h1>2000</h1>
            </div>
          </div>
          <div className="card p-0 ms-3 mt-4">
            <div className="card-header d-flex flex-column align-items-center justify-content-between py-3 gap-2">
              <h5>Eventos totales</h5>
              <Select
                options={CATEGORY_SELECT_OPTIONS}
                initialValue=""
                onChange={(newValue) => console.log(newValue)}
              />
            </div>
            <div className="card-body text-center">
              <h1>120</h1>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Analytics;
