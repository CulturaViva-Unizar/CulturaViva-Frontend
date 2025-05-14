import { useParams } from "react-router";
import InfoCulturalPlace from "../../../../features/cultural-places/components/info-cultural-place";
import { ErrorMessage } from "../../../../components/errors/error-message";
import LoadingIndicator from "../../../../components/ui/loading-indicator";
import { useGetCulturalPlaceById } from "../../../../features/cultural-places/api/get-cultural-place-by-id";

type RouteParams = {
  culturalPlaceId: string;
};

function CulturalPlaceDetails() {
  const { culturalPlaceId } = useParams<RouteParams>();
  const {
    data: culturalPlace,
    isLoading,
    error,
  } = useGetCulturalPlaceById(culturalPlaceId!);

  if (isLoading && !error) {
    return (
      <LoadingIndicator message="Cargando información del lugar cultural..." />
    );
  }

  if (error) {
    return <ErrorMessage message="Error al cargar el lugar cultural" />;
  }

  return (
    <div className="d-flex">
      <div className="col-md-3"></div>
      <InfoCulturalPlace
        culturalPlace={{
          id: culturalPlace!.id,
          title: culturalPlace!.title,
          location: culturalPlace!.location,
          price: culturalPlace!.price,
          description: culturalPlace!.description,
          coordinates: culturalPlace!.coordinates,
          openingHours: culturalPlace!.openingHours,
          image: culturalPlace!.image,
          email: culturalPlace!.email,
          phone: culturalPlace!.phone,
          category: culturalPlace!.category,
          instagram: culturalPlace!.instagram,
          twitter: culturalPlace!.twitter,
        }}
        onClose={() => window.history.back()}
        className="col-md my-3"
      />
      <div className="col-md-3"></div>
    </div>
  );
}

export default CulturalPlaceDetails;
