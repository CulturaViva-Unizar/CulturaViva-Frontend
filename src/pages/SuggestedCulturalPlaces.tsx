import { useNavigate } from "react-router";
import { Card } from "../components/Card";
import MainLayout from "../layouts/MainLayout";

function SuggestedCulturalPlaces() {
  const navigate = useNavigate();

  return (
    <MainLayout
      title="Recomendaciones"
      subtitle="Basadas en tu ubicación actual."
    >
      <div className="row g-4">
        {[...Array(9)].map((_, i) => (
          <div className="col-md-4">
            <Card
              title={"Catedral-Basílica de Nuestra Señora del Pilar"}
              location="Plaza del Pilar, s/n, Casco Antiguo, 50003 Zaragoza"
              rating={5}
              reviews={40637}
              description="Basílica barroca con cúpulas con pinturas, una famosa capilla dedicada a la Virgen María y frescos de Goya."
              className="rounded bg-light shadow"
              onClick={() => navigate(`/lugares-culturales/${i}`)}
            />
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default SuggestedCulturalPlaces;
