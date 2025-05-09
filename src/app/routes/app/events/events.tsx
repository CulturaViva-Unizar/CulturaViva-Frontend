import SearchBar from "../../../../components/ui/search-bar";
import { Select } from "../../../../components/ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../../../../components/ui/card";
import MainLayout from "../../../../components/layouts/main-layout";
import { useNavigate } from "react-router";
import { paths } from "../../../../config/paths";
import { useGetEvents } from "../../../../features/events/api/get-events";
import LoadingIndicator from "../../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../../components/errors/error-message";
import { CATEGORY_SELECT_OPTIONS } from "../../../../config/constants";

function Events() {
  const { data: events = [], isLoading, error } = useGetEvents();
  const navigate = useNavigate();

  if (isLoading && !error) {
    return <LoadingIndicator message="Cargando eventos..." />;
  }

  if (error) {
    return <ErrorMessage message="Error al cargar los eventos" />;
  }

  return (
    <MainLayout title="Eventos">
      <div className="mt-3 mb-5 d-flex flex-column align-items-start align-items-md-center justify-content-center">
        <div className="col-12 col-md-5">
          <SearchBar />
        </div>
        <div className="d-flex gap-3 mt-3">
          <Select
            options={CATEGORY_SELECT_OPTIONS}
            initialValue=""
            onChange={(newValue) => console.log(newValue)}
          />
          <button className="btn btn-light rounded-pill text-nowrap">
            Fecha
            <FontAwesomeIcon icon={faArrowDownWideShort} className="ps-2" />
          </button>
          <button className="btn btn-light rounded-pill text-nowrap">
            Comentarios
            <FontAwesomeIcon icon={faArrowDownWideShort} className="ps-2" />
          </button>
        </div>
      </div>
      <div className="row g-4">
        {events.map((event) => (
          <div className="col-md-3" key={event.id}>
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

export default Events;
