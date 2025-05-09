import { useNavigate } from "react-router";
import { Card } from "../../../../components/ui/card";
import MainLayout from "../../../../components/layouts/main-layout";
import { paths } from "../../../../config/paths";
import { CulturalPlace } from "../../../../features/cultural-places/types/models";

function SuggestedCulturalPlaces() {
  const { data: culturalPlaces = [], isLoading, error } = useGetCulturalPlaceBy();
  const navigate = useNavigate();

  return (
    <MainLayout
      title="Recomendaciones"
      subtitle="Basadas en tu ubicación actual."
    >
      <div className="row g-4">
        {culturalPlaces.map((culturalPlace: CulturalPlace) => (
          <div className="col-md-4">
            <Card
              title={culturalPlace.title}
              location={culturalPlace.location}
              rating={culturalPlace.rating}
              reviews={culturalPlace.totalReviews}
              description={culturalPlace.description}
              className="rounded bg-light shadow"
              onClick={() => navigate(paths.app.culturalPlaces.details.getHref(culturalPlace.id))}
            />
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default SuggestedCulturalPlaces;
