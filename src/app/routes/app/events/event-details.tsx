import { useParams } from "react-router";
import { useGetEventById } from "../../../../features/events/api/get-event-by-id";
import InfoEvent from "../../../../features/events/components/info-event";
import { ErrorMessage } from "../../../../components/errors/error-message";
import LoadingIndicator from "../../../../components/ui/loading-indicator";

type RouteParams = {
  eventId: string;
};

function EventDetails() {
  const { eventId } = useParams<RouteParams>();
  const { data: event, isLoading, error } = useGetEventById(eventId!);

  if (isLoading && !error) {
    return <LoadingIndicator message="Cargando información del evento..." />;
  }

  if (error) {
    return <ErrorMessage message="Error al cargar el evento" />;
  }

  return (
    <div className="d-flex">
      <div className="col-md-3"></div>
      <InfoEvent
        event={{
          id: event!.id,
          title: event!.title,
          description: event!.description,
          image: event!.image,
          category: event!.category,
          location: event!.location,
          coordinates: event!.coordinates,
          startDate: event!.startDate,
          endDate: event!.endDate,
          totalAssistants: event!.totalAssistants,
          assistants: event!.assistants,
          price: event!.price,
          instagram: event!.instagram,
          twitter: event!.twitter,
        }}
        onClose={() => window.history.back()}
        className="col-md my-3"
      />
      <div className="col-md-3"></div>
    </div>
  );
}

export default EventDetails;
