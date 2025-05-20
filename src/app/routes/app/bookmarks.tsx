import SearchBar from "../../../components/ui/search-bar";
import { Select } from "../../../components/ui/select";
import { Card } from "../../../components/ui/card";
import BootstrapPagination from "../../../components/ui/bootstrap-pagination";
import { useMemo, useState } from "react";
import MainLayout from "../../../components/layouts/main-layout";
import { useNavigate } from "react-router";
import { paths } from "../../../config/paths";
import { useGetBookmarksByUser } from "../../../features/bookmarks/api/get-bookmarks-by-user";
import { useUser } from "../../../lib/auth";
import { ITEM_TYPE_SELECT_OPTIONS } from "../../../shared/constants/select-options";
import LoadingIndicator from "../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../components/errors/error-message";
import { Event } from "../../../features/events/types/models";
import { DatePicker } from "../../../components/ui/date-picker";
import { useGetCulturalPlaceCategories } from "../../../features/cultural-places/api/get-cultural-place-categories";
import { useGetEventCategories } from "../../../features/events/api/get-event-categories";
import { format } from "date-fns";
import { GetPaginatedBookmarksRequest } from "../../../types/api";
import { useQueries } from "@tanstack/react-query";
import { getReviewsByEvent } from "../../../features/reviews/api/get-reviews-by-event";
import { getReviewsByCulturalPlace } from "../../../features/reviews/api/get-reviews-by-cultural-place";
import { SortButton } from "../../../components/ui/sort-button";

const ITEMS_PER_PAGE = 6;

function Bookmarks() {
  const user = useUser();
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [type, setType] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<string>("desc");

  const handleOrderBy = () => {
    if (orderBy == "asc") {
      setOrderBy("desc");
    } else {
      setOrderBy("asc");
    }
  };

  const request: GetPaginatedBookmarksRequest = useMemo(
    () => ({
      itemType: type,
      name,
      startDate: date ? format(date, "yyyy-MM-dd") : undefined,
      endDate: date ? format(date, "yyyy-MM-dd") : undefined,
      category,
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      sort: "comments",
      order: orderBy,
    }),
    [type, name, date, category, currentPage, orderBy]
  );

  const {
    data,
    isLoading: isLoadingBookmarks,
    error: errorBookmarks,
  } = useGetBookmarksByUser(user.data!.id, request);

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

  // Fetch reviews for each bookmarked item
  const reviewsQueries = useQueries({
    queries: (data?.items ?? []).map((item) => {
      const isEvent = (item as Event).startDate !== undefined;
      return {
        queryKey: ["reviews", item.id],
        queryFn: () =>
          isEvent
            ? getReviewsByEvent(item.id)
            : getReviewsByCulturalPlace(item.id),
        enabled: !!data,
      };
    }),
  });

  const eventCategoriesOptions =
    eventCategories?.map((cat) => ({ value: cat, label: cat })) ?? [];

  const culturalPlaceCategoriesOptions =
    culturalPlaceCategories?.map((cat) => ({ value: cat, label: cat })) ?? [];

  const categoryOptions = [
    { value: "", label: "Categoría" },
    ...eventCategoriesOptions,
    ...culturalPlaceCategoriesOptions,
  ];

  const onNameChange = (newName: string) => {
    setName(newName);
    setCurrentPage(1);
  };
  const onDateChange = (date: Date | null) => {
    setDate(date);
    setCurrentPage(1);
  };
  const onTypeChange = (newType: string) => {
    setType(newType);
    setCurrentPage(1);
  };
  const onCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  const isLoading =
    isLoadingEventCategories ||
    isLoadingCulturalPlaceCategories ||
    isLoadingBookmarks;
  const isError = Boolean(
    errorEventCategories || errorCulturalPlaceCategories || errorBookmarks
  );

  return (
    <MainLayout title="Guardados">
      {isLoading && !isError && (
        <LoadingIndicator message="Cargando guardados..." />
      )}
      {isError && <ErrorMessage message="Error al cargar los guardados" />}

      <div className="py-3 row gap-2 justify-content-center">
        <div className="row col-12 col-md-3">
          <SearchBar
            className="rounded-pill shadow-sm"
            value={name}
            onSearch={onNameChange}
          />
        </div>
        <div
          className="row col-12 col-md-6 gap-2 gx-2 py-1 flex-nowrap overflow-x-auto hide-scrollbar"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <Select
            className="col shadow-sm"
            options={ITEM_TYPE_SELECT_OPTIONS}
            value={type}
            onChange={onTypeChange}
          />
          <Select
            className="col shadow-sm"
            options={categoryOptions}
            value={category}
            onChange={onCategoryChange}
            style={{ maxWidth: 150 }}
          />
          <DatePicker
            className="col shadow-sm bg-white"
            value={date}
            onChange={onDateChange}
          />
          <SortButton
            label="Comentarios"
            sortBy={orderBy}
            onClick={handleOrderBy}
          />
        </div>
      </div>
      <div className="row g-4">
        {!isLoading && !isError && (!data || data.items.length === 0) ? (
          <div className="text-center">
            <strong>Sin resultados :(</strong>
          </div>
        ) : (
          data &&
          data.items.map((item, i) => {
            const isEvent = (item as Event).startDate !== undefined;
            const rq = reviewsQueries[i];
            const allReviews = rq.data ?? [];
            const parentReviews = isEvent
              ? allReviews.filter((r) => !r.responseTo)
              : allReviews;
            const totalReviews = allReviews.length;
            const avgRating =
              parentReviews.length > 0
                ? parentReviews.reduce((sum, r) => sum + r.rating, 0) /
                  parentReviews.length
                : 0;

            return (
              <div className="col-md-4" key={item.id} style={{ height: 300 }}>
                <Card
                  image={item.image}
                  title={item.title}
                  location={item.location}
                  rating={avgRating}
                  reviews={totalReviews}
                  description={item.description}
                  className="h-100 rounded bg-light shadow"
                  onClick={() =>
                    navigate(
                      isEvent
                        ? paths.app.events.details.getHref(item.id)
                        : paths.app.culturalPlaces.details.getHref(item.id)
                    )
                  }
                />
              </div>
            );
          })
        )}
      </div>
      {data && (
        <BootstrapPagination
          currentPage={currentPage}
          totalPages={data.totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </MainLayout>
  );
}

export default Bookmarks;
