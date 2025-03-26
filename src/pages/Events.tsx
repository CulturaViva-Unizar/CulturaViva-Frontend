import SearchBar from "../components/SearchBar";
import { Select } from "../components/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../components/Card";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router";

function Events() {
  const navigate = useNavigate();

  return (
    <MainLayout title="Eventos">
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
              image="https://www.zaragoza.es/cont/paginas/actividades/imagen/2360.png_1070x713.png"
              title="Regálame esta noche. Albena Teatro"
              location="Teatro de las Esquinas"
              rating={4.1}
              reviews={116}
              description="Dos viejos amantes se reencuentran después de más de veinticinco años desde la última vez que estuvieron juntos. Sus vidas han evolucionado de forma muy diferente, pero ambos coinciden con quien desearían pasar la última noche de su vida. Una comedia romántica que nos hace preguntarnos con quién desearíamos pasar la última noche de nuestra vida."
              className="rounded bg-light shadow"
              onClick={() => navigate(`/eventos/${index}`)}
            />
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default Events;
