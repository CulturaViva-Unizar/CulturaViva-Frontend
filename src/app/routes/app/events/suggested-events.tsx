import { useNavigate } from "react-router";
import { Card } from "../../../../components/ui/card";
import MainLayout from "../../../../components/layouts/main-layout";
import { paths } from "../../../../config/paths";
import { Event } from "../../../../features/events/types/models";
import { useGetSuggestedEvents } from "../../../../features/events/api/get-suggested-events";
import { GetSuggestedEventsRequest } from "../../../../types/api";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "../../../../lib/auth";
import { useQueries } from "@tanstack/react-query";
import { getReviewsByEvent } from "../../../../features/reviews/api/get-reviews-by-event";
import { ErrorMessage } from "../../../../components/errors/error-message";
import LoadingIndicator from "../../../../components/ui/loading-indicator";
import BootstrapPagination from "../../../../components/ui/bootstrap-pagination";

function SuggestedEvents() {
  const user = useUser();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [height, setHeight] = useState(getHeightValue());

  function getHeightValue() {
    return window.innerWidth < 768 ? 320 : 250;
  }
  
  useEffect(() => {
    const onResize = () => {
      setHeight(getHeightValue());
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const request: GetSuggestedEventsRequest = useMemo(
    () => ({
      type: "Event",
      page: currentPage,
      limit: 6,
    }),
    [currentPage]
  );
  const { data, isLoading, error } = useGetSuggestedEvents(
    user.data!.id,
    request
  );

  const reviewsQueries = useQueries({
    queries: (data?.items ?? []).map((e: Event) => ({
      queryKey: ["reviews", e.id],
      queryFn: () => getReviewsByEvent(e.id),
      enabled: !!data,
    })),
  });

  if (isLoading && !error) {
    return (
      <LoadingIndicator message="Cargando recomendaciones de eventos..." />
    );
  }

  if (error) {
    return <ErrorMessage message="Error al cargar los eventos" />;
  }

  return (
    <MainLayout
      title="Recomendaciones de eventos"
      subtitle="Basadas en tus eventos asistidos anteriormente."
    >
      <div className="row g-4">
        {data &&
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
              <div className="col-md-4" style={{ height }}>
                <Card
                  image={event.image}
                  title={event.title}
                  location={event.location}
                  rating={avgRating}
                  reviews={totalReviews}
                  description={event.description}
                  className="rounded bg-light shadow h-100 w-100"
                  onClick={() =>
                    navigate(paths.app.events.details.getHref(event.id))
                  }
                />
              </div>
            );
          })}
        <BootstrapPagination
          currentPage={currentPage}
          totalPages={data!.totalPages}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </MainLayout>
  );
}

export default SuggestedEvents;
