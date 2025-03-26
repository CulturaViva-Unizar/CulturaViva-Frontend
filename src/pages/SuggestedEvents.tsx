import { useNavigate } from "react-router";
import { Card } from "../components/Card";
import MainLayout from "../layouts/MainLayout";

function SuggestedEvents() {
  const navigate = useNavigate();

  return (
    <MainLayout
      title="Recomendaciones"
      subtitle="Basadas en tus eventos asistidos anteriormente."
    >
      <div className="row g-4">
        {[...Array(9)].map((_, i) => (
          <div className="col-md-4">
            <Card
              image="https://www.zaragoza.es/cont/paginas/actividades/imagen/2360.png_1070x713.png"
              title="Regálame esta noche. Albena Teatro"
              location="Teatro de las Esquinas"
              rating={4.1}
              reviews={116}
              description="Dos viejos amantes se reencuentran después de más de veinticinco años desde la última vez que estuvieron juntos. Sus vidas han evolucionado de forma muy diferente, pero ambos coinciden con quien desearían pasar la última noche de su vida. Una comedia romántica que nos hace preguntarnos con quién desearíamos pasar la última noche de nuestra vida."
              className="rounded bg-light shadow"
              onClick={() => navigate(`/eventos/${i}`)}
            />
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default SuggestedEvents;
