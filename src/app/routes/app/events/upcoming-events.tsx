import { Select } from "../../../../components/ui/select";
import { Card } from "../../../../components/ui/card";
import PieChart from "../../../../components/ui/pie-chart";
import BootstrapPagination from "../../../../components/ui/bootstrap-pagination";
import { useState } from "react";
import MainLayout from "../../../../components/layouts/main-layout";
import { useNavigate } from "react-router";
import { paths } from "../../../../config/paths";
import { Event } from "../../../../features/events/types/models";
import { CATEGORY_SELECT_OPTIONS } from "../../../../shared/constants/select-options";

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
      position: "bottom" as const, // TypeScript requiere 'as const'
    },
  },
};

function UpcomingEvents() {
  const { data: events = [], isLoading, error } = useGetEventsBy();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const currentEvents = events.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const navigate = useNavigate();

  return (
    <MainLayout title="Próximos">
      <div className="d-md-flex">
        <div className="col-md-4 d-flex flex-column align-items-center">
          <Select
            options={CATEGORY_SELECT_OPTIONS}
            initialValue=""
            onChange={(newValue) => console.log(newValue)}
          />
          <PieChart data={pieData} options={pieOptions} className="m-4" />
        </div>
        <div className="flex-column col-md-8 row">
          <div className="row g-4 m-0">
            {currentEvents.map((event: Event) => (
              <div className="col-md-6" key={event.id}>
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

export default UpcomingEvents;
