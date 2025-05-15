import { Select } from "../../../../components/ui/select";
import { Card } from "../../../../components/ui/card";
import PieChart from "../../../../components/ui/pie-chart";
import BootstrapPagination from "../../../../components/ui/bootstrap-pagination";
import { useMemo, useState } from "react";
import MainLayout from "../../../../components/layouts/main-layout";
import { useNavigate } from "react-router";
import { paths } from "../../../../config/paths";
import { Event } from "../../../../features/events/types/models";
import { useGetAttendingEventsByUser } from "../../../../features/events/api/get-attending-events-by-user";
import { GetPaginatedEventsRequest } from "../../../../types/api";
import { useQueries } from "@tanstack/react-query";
import { getReviewsByEvent } from "../../../../features/reviews/api/get-reviews-by-event";
import LoadingIndicator from "../../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../../components/errors/error-message";
import { useUser } from "../../../../lib/auth";
import { useGetEventCategories } from "../../../../features/events/api/get-event-categories";

const pieData = {
  labels: ["Arte", "Ocio", "Otros"],
  datasets: [
    {
      data: [40, 35, 25],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF4F74", "#2A92D6", "#FFB400"],
    },
  ],
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const, // TypeScript requiere 'as const'
    },
  },
};

function UpcomingEvents() {
  const userId = useUser().data!.id;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [category, setCategory] = useState<string>("");
  const request: GetPaginatedEventsRequest = useMemo(
    () => ({
      userId,
      category,
      page: currentPage,
      limit: 6,
    }),
    [category, currentPage, userId]
  );
  const {
    data,
    isLoading: isLoadingEvents,
    error: errorEvents,
  } = useGetAttendingEventsByUser(request);
  const navigate = useNavigate();

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

  const reviewsQueries = useQueries({
    queries: (data?.items ?? []).map((e: Event) => ({
      queryKey: ["reviews", e.id],
      queryFn: () => getReviewsByEvent(e.id),
      enabled: !!data,
    })),
  });

  const isLoading = isLoadingEventCategories || isLoadingEvents;
  const isError = Boolean(errorEventCategories || errorEvents);

  if (isLoading && !isError) {
    return <LoadingIndicator message="Cargando eventos próximos..." />;
  }

  if (isError) {
    return <ErrorMessage message="Error al cargar los eventos" />;
  }

  return (
    <MainLayout title="Eventos próximos a los que va a asistir">
      <div className="d-md-flex">
        <div className="col-md-4 d-flex flex-column align-items-center">
          <Select
            className="shadow-sm"
            options={categoryOptions}
            value={category}
            onChange={setCategory}
            style={{ maxWidth: 150 }}
          />
          <PieChart data={pieData} options={pieOptions} className="m-4" />
        </div>
        <div className="flex-column col-md-8 row">
          <div className="row g-4 m-0">
            {data!.items.map((event: Event, i: number) => {
              const rq = reviewsQueries[i];
              const reviews = rq.data ?? [];
              const totalReviews = reviews.length;
              const avgRating =
                totalReviews > 0
                  ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
                  : 0;

              return (
                <div className="col-md-4 d-flex">
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
            })}
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

export default UpcomingEvents;
