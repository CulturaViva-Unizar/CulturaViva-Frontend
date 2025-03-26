import { Select } from "../components/Select";
import { Card } from "../components/Card";
import PieChart from "../components/PieChart";
import BootstrapPagination from "../components/BootstrapPagination";
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { CardProps } from "../common/interfaces";
import { useNavigate } from "react-router";

const simulatedData: CardProps[] = Array.from({ length: 27 }, () => ({
  title: "Catedral-Basílica de Nuestra Señora del Pilar",
  location: "Plaza del Pilar, s/n, Casco Antiguo, 50003 Zaragoza",
  rating: 5,
  reviews: 40637,
  description:
    "Basílica barroca con cúpulas con pinturas, una famosa capilla dedicada a la Virgen María y frescos de Goya.",
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

function PopularCulturalPlaces() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(simulatedData.length / itemsPerPage);
  const currentCards = simulatedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const navigate = useNavigate();

  return (
    <MainLayout title="Populares">
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
                  onClick={() => navigate(`/lugares-culturales/${i}`)}
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

export default PopularCulturalPlaces;
