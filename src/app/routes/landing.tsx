import Map from "../../components/ui/map";
import { Navbar } from "../../components/ui/navbar";
import { useGetEvents } from "../../features/events/api/get-events";
import LoadingIndicator from "../../components/ui/loading-indicator";
import { ErrorMessage } from "../../components/errors/error-message";
import {
  useGetCulturalPlaces,
} from "../../features/cultural-places/api/get-cultural-places";
import MapLegend from "../../components/ui/map-legend";

function Landing() {
  const {
    data: events = [],
    isLoading: isLoadingEvents,
    error: errorEvents,
  } = useGetEvents();
  const {
    data: culturalPlaces = [],
    isLoading: isLoadingCulturalPlaces,
    error: errorCulturalPlaces,
  } = useGetCulturalPlaces();

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
      />
      <Map
        events={events.filter((e) => e.coordinates)}
        culturalPlaces={culturalPlaces.filter((p) => p.coordinates)}
      />
      <MapLegend />
    </>
  );
}

export default Landing;
