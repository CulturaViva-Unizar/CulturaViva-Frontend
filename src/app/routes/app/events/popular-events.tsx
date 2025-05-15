import { Select } from "../../../../components/ui/select";
import { Card } from "../../../../components/ui/card";
import PieChart from "../../../../components/ui/pie-chart";
import BootstrapPagination from "../../../../components/ui/bootstrap-pagination";
import { useMemo, useState } from "react";
import MainLayout from "../../../../components/layouts/main-layout";
import { useNavigate } from "react-router";
import { paths } from "../../../../config/paths";
import { Event } from "../../../../features/events/types/models";
import { useGetPopularEvents } from "../../../../features/events/api/get-popular-events";
import { GetPopularEventsRequest } from "../../../../types/api";
import { ErrorMessage } from "../../../../components/errors/error-message";
import LoadingIndicator from "../../../../components/ui/loading-indicator";
import { getReviewsByEvent } from "../../../../features/reviews/api/get-reviews-by-event";
import { useQueries } from "@tanstack/react-query";
import { generateColors, pieOptions } from "../../../../utils/charts";
import { useGetPopularEventsByCategoryAnalytics } from "../../../../features/analytics/api/get-popular-events-by-category-analytics";

function PopularEvents() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [category, setCategory] = useState<string>("");
  const [eventCategories, setEventCategories] = useState<string[]>([]);

  const request: GetPopularEventsRequest = useMemo(
    () => ({
      category,
      page: currentPage,
      limit: 6,
    }),
    [category, currentPage]
  );
  const {
    data,
    isLoading: isLoadingEvents,
    error: errorEvents,
  } = useGetPopularEvents(request);

  const {
    data: analyticsData,
    isLoading: isLoadingAnalytics,
    error: errorAnalytics,
  } = useGetPopularEventsByCategoryAnalytics();

  const reviewsQueries = useQueries({
    queries: (data?.items ?? []).map((e: Event) => ({
      queryKey: ["reviews", e.id],
      queryFn: () => getReviewsByEvent(e.id),
      enabled: !!data,
    })),
  });

  const pieData = useMemo(() => {
    if (!analyticsData) {
      return {
        labels: [],
        datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }],
      };
    }

    const grouped: Record<string, number> = {};
    // Filtra y agrupa por categoría no vacía
    analyticsData
      .filter((item) => item.category && item.category.trim() !== "")
      .forEach((item) => {
        grouped[item.category] = (grouped[item.category] || 0) + item.count;
      });

    const labels = Object.keys(grouped);
    setEventCategories(labels);
    const dataValues = labels.map((label) => grouped[label]);
    const { backgroundColor, hoverBackgroundColor } = generateColors(
      labels.length
    );

    return {
      labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor,
          hoverBackgroundColor,
        },
      ],
    };
  }, [analyticsData]);

  const chartOptions = useMemo(
    () => ({
      ...pieOptions,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick: (evt: any, active: any[]) => {
        if (!active.length) return;
        const idx = active[0].index;
        const label = pieData.labels[idx];
        setCategory(label);
        setCurrentPage(1);
      },
    }),
    [pieData]
  );

  const categoryOptions = [
    { value: "", label: "Categoría" },
    ...(eventCategories?.map((cat) => ({ value: cat, label: cat })) ?? []),
  ];

  const isLoading = isLoadingEvents || isLoadingAnalytics;
  const isError = Boolean(errorEvents || errorAnalytics);

  if (isLoading && !isError) {
    return <LoadingIndicator message="Cargando eventos populares..." />;
  }

  if (isError) {
    return <ErrorMessage message="Error al cargar los eventos" />;
  }

  return (
    <MainLayout title="Eventos populares">
      <div className="d-md-flex py-md-1">
        <div className="col-md-3 d-flex flex-column align-items-center mt-4">
          <Select
            className="shadow"
            options={categoryOptions}
            value={category}
            onChange={setCategory}
            style={{ maxWidth: 300 }}
          />
          <PieChart
            data={pieData}
            options={chartOptions}
            className="m-4 h-100"
          />
        </div>

        <div className="flex-column col-md-9 row g-0">
          <div className="row g-4 m-0 align-items-stretch">
            {data && data.items.length > 0 ? (
              data.items.map((event: Event, i: number) => {
                const rq = reviewsQueries[i];
                const reviews = rq.data ?? [];
                const totalReviews = reviews.length;
                const parentReviews = reviews.filter((r) => !r.responseTo);
                const avgRating =
                  parentReviews.length > 0
                    ? parentReviews.reduce((sum, r) => sum + r.rating, 0) /
                      parentReviews.length
                    : 0;

                return (
                  <div className="col-md-4 d-flex" key={event.id}>
                    <Card
                      image={event.image}
                      title={event.title}
                      location={event.location}
                      rating={avgRating}
                      reviews={totalReviews}
                      description={event.description}
                      className="h-100 rounded bg-light shadow"
                      onClick={() =>
                        navigate(paths.app.events.details.getHref(event.id))
                      }
                    />
                  </div>
                );
              })
            ) : (
              <div className="text-center">
                <strong>Sin resultados :(</strong>
              </div>
            )}
          </div>

          <BootstrapPagination
            currentPage={currentPage}
            totalPages={data!.totalPages}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default PopularEvents;
