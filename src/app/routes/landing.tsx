import Map from "../../components/ui/map";
import { Navbar } from "../../components/ui/navbar";
import { useGetEvents } from "../../features/events/api/get-events";
import LoadingIndicator from "../../components/ui/loading-indicator";
import { ErrorMessage } from "../../components/errors/error-message";
import { useGetCulturalPlaces } from "../../features/cultural-places/api/get-cultural-places";
import MapLegend from "../../components/ui/map-legend";
import { useEffect, useMemo, useState } from "react";
import { Items } from "../../shared/types/enums";
import { format } from "date-fns";
import { getBookmarksByUser } from "../../features/bookmarks/api/get-bookmarks-by-user";
import { GetPaginatedEventsRequest } from "../../types/api";
import { useUser } from "../../lib/auth";
import { useQueryClient } from "@tanstack/react-query";

function Landing() {
  const [searchText, setSearchText] = useState<string>("");
  const [itemType, setItemType] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [price, setPrice] = useState<number>(0);
  const userId = useUser().data?.id;
  const queryClient = useQueryClient();
  const eventRequest = useMemo(
    () => ({
      name: searchText,
      category,
      maxPrice: price,
      startDate: date
        ? format(date, "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd"),
      page: 1,
      limit: 2000,
    }),
    [searchText, category, price, date]
  );
  const culturalPlaceRequest = useMemo(
    () => ({
      name: searchText,
      category,
      maxPrice: price,
      startDate: date ? format(date, "yyyy-MM-dd") : undefined,
      page: 1,
      limit: 2000,
    }),
    [searchText, category, price, date]
  );
  const {
    data: events = [],
    isLoading: isLoadingEvents,
    error: errorEvents,
  } = useGetEvents(eventRequest);
  const {
    data: culturalPlaces = [],
    isLoading: isLoadingCulturalPlaces,
    error: errorCulturalPlaces,
  } = useGetCulturalPlaces(culturalPlaceRequest);

  useEffect(() => {
    if (queryClient && userId) {
      const request: GetPaginatedEventsRequest = {
        userId,
        page: 1,
        limit: 100,
      };
      queryClient.prefetchQuery({
        queryKey: ["bookmarks", request],
        queryFn: () => getBookmarksByUser(request),
      });
    }
  }, [queryClient, userId]);

  const isLoading = isLoadingEvents || isLoadingCulturalPlaces;
  const isError = Boolean(errorEvents || errorCulturalPlaces);

  return (
    <>
      {isLoading && !isError && (
        <LoadingIndicator message="Cargando eventos y lugares culturales..." />
      )}
      {isError && <ErrorMessage message="Error al cargar los datos" />}

      <Navbar
        className="position-absolute top-0 start-0 p-3 vw-100"
        style={{ zIndex: 10000 }}
        searchText={searchText}
        onSearchTextChange={setSearchText}
        itemType={itemType}
        onItemTypeChange={setItemType}
        category={category}
        onCategoryChange={setCategory}
        price={price}
        onPriceChange={setPrice}
        date={date}
        onDateChange={setDate}
      />
      <Map
        events={
          itemType == Items.Evento || !itemType
            ? events.filter(
                (e) =>
                  e.coordinates &&
                  e.coordinates.latitude &&
                  e.coordinates.longitude
              )
            : []
        }
        culturalPlaces={
          itemType == Items.Lugar || !itemType
            ? culturalPlaces.filter(
                (p) =>
                  p.coordinates &&
                  p.coordinates.latitude &&
                  p.coordinates.longitude
              )
            : []
        }
      />
      <MapLegend />
    </>
  );
}

export default Landing;
