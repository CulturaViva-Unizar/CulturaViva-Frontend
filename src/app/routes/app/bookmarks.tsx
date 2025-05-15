import SearchBar from "../../../components/ui/search-bar";
import { Select } from "../../../components/ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
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

const ITEMS_PER_PAGE = 9;

function Bookmarks() {
  const user = useUser();
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [type, setType] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const request = useMemo(
    () => ({
      userId: user.data!.id,
      eventType: type,
      eventName: name,
      eventDate: date ? format(date, "yyyy-MM-dd") : undefined,
      eventCategory: category,
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    }),
    [user.data, type, name, date, category, currentPage]
  );
  const {
    data,
    isLoading: isLoadingBookmarks,
    error: errorBookmarks,
  } = useGetBookmarksByUser(request);

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

  const eventCategoriesOptions =
    eventCategories?.map((cat) => ({
      value: cat,
      label: cat,
    })) ?? [];

  const culturalPlaceCategoriesOptions =
    culturalPlaceCategories?.map((cat) => ({
      value: cat,
      label: cat,
    })) ?? [];

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
          <button className="col btn rounded-pill shadow-sm text-nowrap">
            Comentarios
            <FontAwesomeIcon icon={faArrowDownWideShort} className="ps-2" />
          </button>
        </div>
      </div>
      <div className="row g-4">
        {!isLoading && !isError && (!data || data.items.length == 0) ? (
          <div className="text-center">
            <strong>Sin resultados :(</strong>
          </div>
        ) : (
          data &&
          data.items.map((item) => {
            const isEvent = (item as Event).startDate !== undefined;
            return (
              <div className="col-md-4" key={item.id}>
                <Card
                  image={item.image}
                  title={item.title}
                  location={item.location}
                  rating={5}
                  reviews={0}
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
