import { useParams } from "react-router";
import InfoCulturalPlace from "../../../../features/cultural-places/components/info-cultural-place";
import { ErrorMessage } from "../../../../components/errors/error-message";
import LoadingIndicator from "../../../../components/ui/loading-indicator";

type RouteParams = {
  culturalPlaceId: string;
};

function CulturalPlaceDetails() {
  const { culturalPlaceId } = useParams<RouteParams>();
  const { data: culturalPlaces = [], isLoading, error } = useGetCulturalPlaceById(culturalPlaceId!);

  if (isLoading && !error) {
    return <LoadingIndicator message="Cargando información del lugar cultural..." />;
  }

  if (error) {
    return <ErrorMessage message="Error al cargar el lugar cultural" />;
  }

  return <InfoCulturalPlace {...culturalPlaces} />;
}

export default CulturalPlaceDetails;
