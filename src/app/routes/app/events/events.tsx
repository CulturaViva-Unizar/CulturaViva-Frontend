import SearchBar from "../../../../components/ui/search-bar";
import { Select } from "../../../../components/ui/select";
import { Card } from "../../../../components/ui/card";
import MainLayout from "../../../../components/layouts/main-layout";
import { useNavigate } from "react-router";
import { paths } from "../../../../config/paths";
import { useGetEvents } from "../../../../features/events/api/get-events";
import LoadingIndicator from "../../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../../components/errors/error-message";
import { GetEventsRequest } from "../../../../types/api";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import { DatePicker } from "../../../../components/ui/date-picker";
import { useQueries } from "@tanstack/react-query";
import { getReviewsByEvent } from "../../../../features/reviews/api/get-reviews-by-event";
import { Event } from "../../../../features/events/types/models";
import BootstrapPagination from "../../../../components/ui/bootstrap-pagination";
import { SortButton } from "../../../../components/ui/sort-button";
import { useGetCulturalPlaceCategories } from "../../../../features/cultural-places/api/get-cultural-place-categories";
import { useGetEventCategories } from "../../../../features/events/api/get-event-categories";

function Events() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [sortBy, setSortBy] = useState<string>("");
  const request: GetEventsRequest = useMemo(
    () => ({
      name: searchText,
      category,
      startDate: date
        ? format(date, "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd"),
      endDate: date ? format(date, "yyyy-MM-dd") : undefined,
      sort: sortBy == "" ? undefined : "comments",
      order: sortBy,
      page: 1,
      limit: 8,
    }),
    [searchText, category, date, sortBy]
  );
  const {
    data,
    isLoading: isLoadingEvents,
    error: errorEvents,
  } = useGetEvents(request);
  const events = data?.items.filter(
    (e) => e.coordinates && e.coordinates.latitude && e.coordinates.longitude
  );
  const navigate = useNavigate();

  const {
    data: eventCategories,
    isLoading: isLoadingEventCategories,
    error: errorEventCategories,
  } = useGetEventCategories();
  const {
    data: culturalPlaceCategories,
    isLoading: isLoadingCulturalPlaceCategories,
    error: errorCulturalPlaceCategories,
  } = useGetCulturalPlaceCategories();

  const eventOptions =
    eventCategories?.map((cat) => ({
      value: cat,
      label: cat,
    })) ?? [];

  const culturalOptions =
    culturalPlaceCategories?.map((cat) => ({
      value: cat,
      label: cat,
    })) ?? [];

  const categoryOptions = [
    { value: "", label: "Categoría" },
    ...eventOptions,
    ...culturalOptions,
  ];

  const reviewsQueries = useQueries({
    queries: (events ?? []).map((e: Event) => ({
      queryKey: ["reviews", e.id],
      queryFn: () => getReviewsByEvent(e.id),
      enabled: !!events,
    })),
  });

  const handleOrderBy = () => {
    if (!sortBy || sortBy == "asc") {
      setSortBy("desc");
    } else {
      setSortBy("asc");
    }
  };

  const isLoading =
    isLoadingEventCategories ||
    isLoadingCulturalPlaceCategories ||
    isLoadingEvents;
  const isError = Boolean(
    errorEventCategories || errorCulturalPlaceCategories || errorEvents
  );

  if (isLoading && !isError) {
    return <LoadingIndicator message="Cargando eventos..." />;
  }

  if (isError) {
    return <ErrorMessage message="Error al cargar los eventos" />;
  }

  return (
    <MainLayout title="Todos los eventos">
      <div className="mt-3 mb-5 d-flex flex-column align-items-start align-items-md-center justify-content-center">
        <div className="col-12 col-md-5">
          <SearchBar
            value={searchText}
            onSearch={setSearchText}
            className="shadow-sm rounded-pill"
          />
        </div>
        <div className="d-flex gap-3 mt-3">
          <Select
            className="shadow-sm"
            options={categoryOptions}
            value={category}
            onChange={setCategory}
            style={{ maxWidth: 150 }}
          />
          <DatePicker
            value={date}
            onChange={setDate}
            className="shadow-sm bg-white"
          />
          <SortButton
            label="Comentarios"
            sortBy={sortBy}
            onClick={handleOrderBy}
          />
        </div>
      </div>
      <div className="row g-4">
        {events && events.length > 0 ? (
          events.map((event: Event, i: number) => {
            const rq = reviewsQueries[i];
            const reviews = rq.data ?? [];
            const totalReviews = reviews.length;
            const avgRating =
              totalReviews > 0
                ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
                : 0;

            return (
              <div className="col-md-3" key={event.id}>
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
    </MainLayout>
  );
}

export default Events;
