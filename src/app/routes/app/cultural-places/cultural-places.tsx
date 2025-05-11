import SearchBar from "../../../../components/ui/search-bar";
import { Select } from "../../../../components/ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../../../../components/ui/card";
import MainLayout from "../../../../components/layouts/main-layout";
import { useNavigate } from "react-router";
import { paths } from "../../../../config/paths";
import { useGetCulturalPlaces } from "../../../../features/cultural-places/api/get-cultural-places";
import { CulturalPlace } from "../../../../features/cultural-places/types/models";
import { ErrorMessage } from "../../../../components/errors/error-message";
import LoadingIndicator from "../../../../components/ui/loading-indicator";
import { CATEGORY_SELECT_OPTIONS } from "../../../../shared/constants/select-options";

function CulturalPlaces() {
  const {
    data: culturalPlaces = [],
    isLoading,
    error,
  } = useGetCulturalPlaces();
  const navigate = useNavigate();

  if (isLoading && !error) {
    return <LoadingIndicator message="Cargando eventos..." />;
  }

  if (error) {
    return <ErrorMessage message="Error al cargar los eventos" />;
  }

  return (
    <MainLayout title="Lugares culturales">
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
        {culturalPlaces.map((culturalPlace: CulturalPlace) => (
          <div className="col-md-3" key={culturalPlace.id}>
            <Card
              title={culturalPlace.title}
              location={culturalPlace.location}
              rating={culturalPlace.rating}
              reviews={culturalPlace.totalReviews}
              description={culturalPlace.description}
              className="rounded bg-light shadow"
              onClick={() =>
                navigate(
                  paths.app.culturalPlaces.details.getHref(culturalPlace.id)
                )
              }
            />
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default CulturalPlaces;
