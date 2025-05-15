import MainLayout from "../../../components/layouts/main-layout";
import ChartCard from "../../../components/ui/chart-card";
import { Select } from "../../../components/ui/select";
import BarChart from "../../../components/ui/bar-chart";
import LineChart from "../../../components/ui/line-chart";
import DoughnutChart from "../../../components/ui/doughnut-chart";
import { USER_ANALYTICS_FILTER_OPTIONS } from "../../../shared/constants/select-options";
import { useState } from "react";
import { useGetUsersAnalytics } from "../../../features/analytics/api/get-users-analytics";
import LoadingIndicator from "../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../components/errors/error-message";
import {
  GetEventsAnalyticsRequest,
  GetUsersAnalyticsRequest,
} from "../../../types/api";
import { useGetEventsAnalytics } from "../../../features/analytics/api/get-events-analytics";
import { useGetEventCategories } from "../../../features/events/api/get-event-categories";

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
  const [userFilterOption, setUserFilterOption] = useState("");
  const [categoryFilterOption, setCategoryFilterOption] = useState("");
  const getUsersAnalyticsRequest: GetUsersAnalyticsRequest = {
    type: userFilterOption,
  };
  const {
    data: usersAnalytics,
    isLoading: isLoadingUsersAnalytics,
    error: errorUsersAnalytics,
  } = useGetUsersAnalytics(getUsersAnalyticsRequest);
  const getEventsAnalyticsRequest: GetEventsAnalyticsRequest = {
    category: categoryFilterOption,
  };
  const {
    data: eventsAnalytics,
    isLoading: isLoadingEventsAnalytics,
    error: errorEventsAnalytics,
  } = useGetEventsAnalytics(getEventsAnalyticsRequest);

  const {
    data: eventCategories,
    isLoading: isLoadingEventCategories,
    error: errorEventCategories,
  } = useGetEventCategories();

  const categoryOptions = [
    { value: "", label: "Categoría" },
    ...(eventCategories?.map((cat) => ({
      value: cat,
      label: cat,
    })) ?? []),
  ];

  const isLoading =
    isLoadingUsersAnalytics ||
    isLoadingEventsAnalytics ||
    isLoadingEventCategories;
  const isError =
    errorUsersAnalytics || errorEventsAnalytics || errorEventCategories;

  if (isLoading && !isError) {
    return <LoadingIndicator message="Cargando estadísticas..." />;
  }

  if (isError) {
    return <ErrorMessage message="Error alcargar las estadísticas" />;
  }

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
                options={USER_ANALYTICS_FILTER_OPTIONS}
                value={userFilterOption}
                onChange={setUserFilterOption}
              />
            </div>
            <div className="card-body text-center">
              <h1>{usersAnalytics!.totalUsers}</h1>
            </div>
          </div>
          <div className="card p-0 ms-3 mt-4">
            <div className="card-header d-flex flex-column align-items-center justify-content-between py-3 gap-2">
              <h5>Eventos totales</h5>
              <Select
                className="shadow-sm"
                options={categoryOptions}
                value={categoryFilterOption}
                onChange={setCategoryFilterOption}
                style={{ maxWidth: 150 }}
              />
            </div>
            <div className="card-body text-center">
              <h1>{eventsAnalytics!.totalEvents}</h1>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Analytics;
