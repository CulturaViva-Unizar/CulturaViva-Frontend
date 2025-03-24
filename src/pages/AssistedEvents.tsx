import { Select } from "../components/Select";
import { Card } from "../components/Card";
import PieChart from "../components/PieChart";
import BootstrapPagination from "../components/BootstrapPagination";
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { CardProps } from "../common/interfaces";
import { useNavigate } from "react-router";

const simulatedData: CardProps[] = Array.from({ length: 27 }, (_, index) => ({
  image:
    "https://www.zaragoza.es/cont/paginas/actividades/imagen/2360.png_1070x713.png",
  title: `Regálame esta noche. Albena Teatro ${index + 1}`,
  location: "Teatro de las Esquinas",
  rating: 4.1,
  reviews: 116,
  description:
    "Dos viejos amantes se reencuentran después de más de veinticinco años. Una comedia romántica para preguntarnos con quién desearíamos pasar la última noche de nuestra vida.",
}));

const pieData = {
  labels: ["Arte", "Ocio", "Otros"],
  datasets: [
    {
      data: [40, 35, 25],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF4F74", "#2A92D6", "#FFB400"],
    },
  ],
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

function AssistedEvents() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(simulatedData.length / itemsPerPage);
  const currentCards = simulatedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const navigate = useNavigate();

  const showEventDetails = (eventId: number) => {
    navigate(`/eventos/${eventId}`);
  };

  return (
    <MainLayout title="Asistidos">
      <div className="d-md-flex">
        <div className="col-md-4 d-flex flex-column align-items-center">
          <Select
            options={[
              { value: "categoria", label: "Categoría" },
              { value: "arte", label: "Arte" },
              { value: "ocio", label: "Ocio" },
            ]}
            initialValue="categoria"
            onChange={(newValue) => console.log(newValue)}
          />
          <PieChart data={pieData} options={pieOptions} className="m-4" />
        </div>
        <div className="flex-column col-md-8 row">
          <div className="row g-4 m-0">
            {currentCards.map((card, i) => (
              <div className="col-md-6" key={i}>
                <Card
                  image={card.image}
                  title={card.title}
                  location={card.location}
                  rating={card.rating}
                  reviews={card.reviews}
                  description={card.description}
                  className="rounded bg-light shadow"
                  onClick={() => showEventDetails(i)}
                />
              </div>
            ))}
          </div>
          <BootstrapPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default AssistedEvents;
