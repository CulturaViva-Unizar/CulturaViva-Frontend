import SearchBar from "../components/SearchBar";
import { Select } from "../components/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../components/Card";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router";

function CulturalPlaces() {
  const navigate = useNavigate();

  return (
    <MainLayout title="Lugares culturales">
      <div className="mt-3 mb-5 d-flex flex-column align-items-start align-items-md-center justify-content-center">
        <div className="col-12 col-md-5">
          <SearchBar />
        </div>
        <div className="d-flex gap-3 mt-3">
          <Select
            options={[
              { value: "categoria", label: "Categoría" },
              { value: "arte", label: "Arte" },
              { value: "ocio", label: "Ocio" },
            ]}
            initialValue="categoria"
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
        {[...Array(24)].map((_, index) => (
          <div className="col-md-3" key={index}>
            <Card
              title={"Catedral-Basílica de Nuestra Señora del Pilar"}
              location="Plaza del Pilar, s/n, Casco Antiguo, 50003 Zaragoza"
              rating={5}
              reviews={40637}
              description="Basílica barroca con cúpulas con pinturas, una famosa capilla dedicada a la Virgen María y frescos de Goya."
              className="rounded bg-light shadow"
              onClick={() => navigate(`/lugares-culturales/${index}`)}
            />
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default CulturalPlaces;
