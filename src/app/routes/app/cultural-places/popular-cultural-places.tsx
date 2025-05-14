import { Select } from "../../../../components/ui/select";
import { Card } from "../../../../components/ui/card";
import PieChart from "../../../../components/ui/pie-chart";
import BootstrapPagination from "../../../../components/ui/bootstrap-pagination";
import { useState } from "react";
import MainLayout from "../../../../components/layouts/main-layout";
import { useNavigate } from "react-router";
import { paths } from "../../../../config/paths";
import { CulturalPlace } from "../../../../features/cultural-places/types/models";
import { useGetCulturalPlaceCategories } from "../../../../features/cultural-places/api/get-cultural-place-categories";
import { useGetEventCategories } from "../../../../features/events/api/get-event-categories";
import { useQueries } from "@tanstack/react-query";
import { getReviewsByCulturalPlace } from "../../../../features/reviews/api/get-reviews-by-cultural-place";

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
  const { data, isLoading, error } = useGetCulturalPlaceBy();
  const culturalPlaces = data?.items.filter(
    (p) => p.coordinates && p.coordinates.latitude && p.coordinates.longitude
  );
  const [category, setCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

  const {
    data: eventCategories,
    isLoading: isLoadingEventCategories,
    error: errorEventCategories,
  } = useGetEventCategories();
  const {
    data: culturalPlaceCategories,
    isLoading: isLoadingCulturalPlaceCategories,
    error: errorCulturalPlaceCategories,
  } = useGetCulturalPlaceCategories();

  const eventOptions =
    eventCategories?.map((cat) => ({
      value: cat,
      label: cat,
    })) ?? [];

  const culturalOptions =
    culturalPlaceCategories?.map((cat) => ({
      value: cat,
      label: cat,
    })) ?? [];

  const categoryOptions = [
    { value: "", label: "Categoría" },
    ...eventOptions,
    ...culturalOptions,
  ];

  const reviewsQueries = useQueries({
    queries: (culturalPlaces ?? []).map((p: CulturalPlace) => ({
      queryKey: ["reviews", p.id],
      queryFn: () => getReviewsByCulturalPlace(p.id),
      enabled: !!culturalPlaces,
    })),
  });

  return (
    <MainLayout title="Populares">
      <div className="d-md-flex">
        <div className="col-md-4 d-flex flex-column align-items-center">
          <Select
            className="shadow-sm"
            options={categoryOptions}
            value={category}
            onChange={setCategory}
            style={{ maxWidth: 150 }}
          />
          <PieChart data={pieData} options={pieOptions} className="m-4" />
        </div>
        <div className="flex-column col-md-8 row">
          <div className="row g-4 m-0">
            {culturalPlaces && culturalPlaces?.length > 0 ? (
              culturalPlaces.map.map(
                (culturalPlace: CulturalPlace, i: number) => {
                  const rq = reviewsQueries[i];
                  const reviews = rq.data ?? [];
                  const totalReviews = reviews.length;
                  const avgRating =
                    totalReviews > 0
                      ? reviews.reduce((sum, r) => sum + r.rating, 0) /
                        totalReviews
                      : 0;

                  return (
                    <div className="col-md-6" key={culturalPlace.id}>
                      <Card
                        image={culturalPlace.image}
                        title={culturalPlace.title}
                        location={culturalPlace.location}
                        rating={avgRating}
                        reviews={totalReviews}
                        description={culturalPlace.description}
                        className="rounded bg-light shadow"
                        onClick={() =>
                          navigate(
                            paths.app.culturalPlaces.details.getHref(
                              culturalPlace.id
                            )
                          )
                        }
                      />
                    </div>
                  );
                }
              )
            ) : (
              <div className="text-center">
                <strong>Sin resultados :(</strong>
              </div>
            )}
          </div>
          <BootstrapPagination
            currentPage={currentPage}
            totalPages={data!.totalPages}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default PopularCulturalPlaces;
