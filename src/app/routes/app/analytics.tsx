import MainLayout from "../../../components/layouts/main-layout";
import ChartCard from "../../../features/analytics/components/chart-card";
import { Select } from "../../../components/ui/select";
import BarChart from "../../../components/ui/bar-chart";
import LineChart from "../../../components/ui/line-chart";
import DoughnutChart from "../../../components/ui/doughnut-chart";
import { USER_ANALYTICS_FILTER_OPTIONS } from "../../../shared/constants/select-options";
import { useMemo, useState } from "react";
import { useGetUsersAnalytics } from "../../../features/analytics/api/get-users-analytics";
import LoadingIndicator from "../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../components/errors/error-message";
import {
  GetTimeAnalyticsRequest,
  GetEventsAnalyticsRequest,
  GetUsersAnalyticsRequest,
} from "../../../types/api";
import { useGetEventsAnalytics } from "../../../features/analytics/api/get-events-analytics";
import { useGetEventCategories } from "../../../features/events/api/get-event-categories";
import { useGetCommentsAnalytics } from "../../../features/analytics/api/get-comments-analytics";
import {
  barOptions,
  doughnutOptions,
  lineOptions,
} from "../../../utils/charts";
import { Timeframe } from "../../../shared/types/enums";
import { useGetDisabledUsersAnalytics } from "../../../features/analytics/api/get-disabled-users-analytics";
import { useGetSavedEventsAnalytics } from "../../../features/analytics/api/get-saved-items-analytics";
import { useGetWebVisitsAnalytics } from "../../../features/analytics/api/get-web-visits-analytics";

function Analytics() {
  const [userFilterOption, setUserFilterOption] = useState("");
  const [categoryFilterOption, setCategoryFilterOption] = useState("");
  const [commentsFilterOption, setCommentsFilterOption] = useState(
    Timeframe.Semana
  );
  const [disabledUsersFilterOption, setDisabledUsersFilterOption] = useState(
    Timeframe.Semana
  );
  const [savedEventsFilterOption, setSavedEventsFilterOption] = useState(
    Timeframe.Semana
  );
  const [webVisitsFilterOption, setWebVisitsFilterOption] = useState(
    Timeframe.Semana
  );

  const getUsersAnalyticsRequest: GetUsersAnalyticsRequest = {
    type: userFilterOption,
  };
  const {
    data: totalUsers,
    isLoading: isLoadingUsersAnalytics,
    error: errorUsersAnalytics,
  } = useGetUsersAnalytics(getUsersAnalyticsRequest);

  const getEventsAnalyticsRequest: GetEventsAnalyticsRequest = {
    category: categoryFilterOption,
  };
  const {
    data: totalEvents,
    isLoading: isLoadingEventsAnalytics,
    error: errorEventsAnalytics,
  } = useGetEventsAnalytics(getEventsAnalyticsRequest);

  const getCommentsAnalyticsRequest: GetTimeAnalyticsRequest = {
    range: commentsFilterOption,
  };
  const {
    data: commentsData,
    isLoading: isLoadingCommentsAnalytics,
    error: errorCommentsAnalytics,
  } = useGetCommentsAnalytics(getCommentsAnalyticsRequest);
  const doughnutData = useMemo(() => {
    if (!commentsData) {
      return {
        labels: [],
        datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }],
      };
    }

    const labels = ["Añadidos", "Eliminados"];
    const dataValues = [commentsData.totalAdded, commentsData.totalEliminated];
    const backgroundColor = ["rgb(75, 192, 192)", "rgb(255, 99, 132)"];

    return {
      labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor,
          hoverOffset: 4,
        },
      ],
    };
  }, [commentsData]);

  const {
    data: eventCategories,
    isLoading: isLoadingEventCategories,
    error: errorEventCategories,
  } = useGetEventCategories();

  const categoryOptions = [
    { value: "", label: "Categoría" },
    ...(eventCategories?.filter(cat => cat !== "").map((cat) => ({
      value: cat,
      label: cat,
    })) ?? []),
  ];

  const getDisabledUsersAnalyticsRequest: GetTimeAnalyticsRequest = {
    range: disabledUsersFilterOption,
  };
  const {
    data: disabledUsersData = [],
    isLoading: isLoadingDisabledUsersAnalytics,
    error: errorDisabledUsersAnalytics,
  } = useGetDisabledUsersAnalytics(getDisabledUsersAnalyticsRequest);
  const barDisabledUsersData = useMemo(() => {
    if (!disabledUsersData) {
      return {
        labels: [],
        datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }],
      };
    }

    const labels = disabledUsersData.map((item) => item.date);
    const dataValues = disabledUsersData.map((item) => item.total);
    const backgroundColor = ["rgba(75, 192, 192, 0.2)"];
    const borderColor = ["rgb(75, 192, 192)"];

    return {
      labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    };
  }, [disabledUsersData]);

  const getSavedItemsAnalyticsRequest: GetTimeAnalyticsRequest = {
    range: savedEventsFilterOption,
  };
  const {
    data: savedEventsData = [],
    isLoading: isLoadingSavedEventsAnalytics,
    error: errorSavedEventsAnalytics,
  } = useGetSavedEventsAnalytics(getSavedItemsAnalyticsRequest);
  const barSavedEventsData = useMemo(() => {
    if (!savedEventsData) {
      return {
        labels: [],
        datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }],
      };
    }

    const labels = savedEventsData.map((item) => item.date);
    const dataValues = savedEventsData.map((item) => item.total);
    const backgroundColor = ["rgba(75, 192, 192, 0.2)"];
    const borderColor = ["rgb(75, 192, 192)"];

    return {
      labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    };
  }, [savedEventsData]);

  const getWebVisitsAnalyticsRequest: GetTimeAnalyticsRequest = {
    range: webVisitsFilterOption,
  };
  const {
    data: webVisitsData = [],
    isLoading: isLoadingWebVisitsAnalytics,
    error: errorWebVisitsAnalytics,
  } = useGetWebVisitsAnalytics(getWebVisitsAnalyticsRequest);
  const lineData = useMemo(() => {
    if (!webVisitsData) {
      return {
        labels: [],
        datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }],
      };
    }

    const labels = webVisitsData.map((item) => item.date);
    const dataValues = webVisitsData.map((item) => item.total);
    const borderColor = ["rgb(75, 192, 192)"];

    return {
      labels,
      datasets: [
        {
          data: dataValues,
          borderColor,
        },
      ],
    };
  }, [webVisitsData]);

  const isLoading =
    isLoadingUsersAnalytics ||
    isLoadingEventsAnalytics ||
    isLoadingEventCategories ||
    isLoadingCommentsAnalytics ||
    isLoadingDisabledUsersAnalytics ||
    isLoadingSavedEventsAnalytics ||
    isLoadingWebVisitsAnalytics;
  const isError =
    errorUsersAnalytics ||
    errorEventsAnalytics ||
    errorEventCategories ||
    errorCommentsAnalytics ||
    errorDisabledUsersAnalytics ||
    errorSavedEventsAnalytics ||
    errorWebVisitsAnalytics;

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
          <ChartCard
            title={"Visitas de la web"}
            value={webVisitsFilterOption}
            onChange={setWebVisitsFilterOption}
          >
            <LineChart data={lineData} options={lineOptions} />
          </ChartCard>
        </div>
        <div className="col-12 col-md-6">
          <ChartCard
            title={"Items guardados"}
            value={savedEventsFilterOption}
            onChange={setSavedEventsFilterOption}
          >
            <BarChart data={barSavedEventsData} options={barOptions} />
          </ChartCard>
        </div>
        <div className="col-12 col-md-4">
          <ChartCard
            title={"Comentarios añadidos vs. eliminados"}
            value={commentsFilterOption}
            onChange={setCommentsFilterOption}
          >
            <DoughnutChart data={doughnutData} options={doughnutOptions} />
          </ChartCard>
        </div>
        <div className="col-12 col-md-6">
          <ChartCard
            title={"Usuarios deshabilitados"}
            value={disabledUsersFilterOption}
            onChange={setDisabledUsersFilterOption}
          >
            <BarChart data={barDisabledUsersData} options={barOptions} />
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
                className="shadow-sm"
              />
            </div>
            <div className="card-body text-center">
              <h1>{totalUsers}</h1>
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
              <h1>{totalEvents}</h1>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Analytics;
