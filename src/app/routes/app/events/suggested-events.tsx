import { useNavigate } from "react-router";
import { Card } from "../../../../components/ui/card";
import MainLayout from "../../../../components/layouts/main-layout";
import { paths } from "../../../../config/paths";
import { Event } from "../../../../features/events/types/models";

function SuggestedEvents() {
  const { data: events = [], isLoading, error } = useGetEventsBy();
  const navigate = useNavigate();

  return (
    <MainLayout
      title="Recomendaciones"
      subtitle="Basadas en tus eventos asistidos anteriormente."
    >
      <div className="row g-4">
        {events.map((event: Event) => (
          <div className="col-md-4">
            <Card
              image={event.image}
              title={event.title}
              location={event.location}
              rating={event.rating}
              reviews={event.totalReviews}
              description={event.description}
              className="rounded bg-light shadow"
              onClick={() =>
                navigate(paths.app.events.details.getHref(event.id))
              }
            />
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default SuggestedEvents;
