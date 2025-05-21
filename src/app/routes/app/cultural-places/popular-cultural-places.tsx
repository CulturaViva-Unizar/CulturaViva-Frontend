import { Select } from "../../../../components/ui/select";
import { Card } from "../../../../components/ui/card";
import BootstrapPagination from "../../../../components/ui/bootstrap-pagination";
import { useMemo, useState } from "react";
import MainLayout from "../../../../components/layouts/main-layout";
import { useNavigate } from "react-router";
import { paths } from "../../../../config/paths";
import { CulturalPlace } from "../../../../features/cultural-places/types/models";
import { useQueries } from "@tanstack/react-query";
import { getReviewsByCulturalPlace } from "../../../../features/reviews/api/get-reviews-by-cultural-place";
import { useGetPopularCulturalPlaces } from "../../../../features/cultural-places/api/get-popular-cultural-places";
import { GetPopularCulturalPlacesRequest } from "../../../../types/api";
import { ErrorMessage } from "../../../../components/errors/error-message";
import LoadingIndicator from "../../../../components/ui/loading-indicator";
import { useGetPopularCulturalPlacesByCategoryAnalytics } from "../../../../features/analytics/api/get-popular-cultural-places-by-category-analytics";
import { generateColors, pieOptions } from "../../../../utils/charts";
import PieChart from "../../../../components/ui/pie-chart";

function PopularCulturalPlaces() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [category, setCategory] = useState<string>("");
  const height = window.innerWidth < 768 ? 200 : 180;
  const [culturalPlaceCategories, setCulturalPlaceCategories] = useState<
    string[]
  >([]);

  const request: GetPopularCulturalPlacesRequest = useMemo(
    () => ({
      category,
      page: currentPage,
      limit: 6,
    }),
    [category, currentPage]
  );
  const {
    data,
    isLoading: isLoadingCulturalPlaces,
    error: errorCulturalPlaces,
  } = useGetPopularCulturalPlaces(request);

  const {
    data: analyticsData,
    isLoading: isLoadingAnalytics,
    error: errorAnalytics,
  } = useGetPopularCulturalPlacesByCategoryAnalytics();

  const reviewsQueries = useQueries({
    queries: (data?.items ?? []).map((p: CulturalPlace) => ({
      queryKey: ["reviews", p.id],
      queryFn: () => getReviewsByCulturalPlace(p.id),
      enabled: !!data,
    })),
  });

  const pieData = useMemo(() => {
    if (!analyticsData) {
      return {
        labels: [],
        datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }],
      };
    }

    const grouped: Record<string, number> = {};
    // Filtra y agrupa por categoría no vacía
    analyticsData
      .filter((item) => item.category && item.category.trim() !== "")
      .forEach((item) => {
        grouped[item.category] = (grouped[item.category] || 0) + item.count;
      });

    const labels = Object.keys(grouped);
    setCulturalPlaceCategories(labels);
    const dataValues = labels.map((label) => grouped[label]);
    const { backgroundColor, hoverBackgroundColor } = generateColors(
      labels.length
    );

    return {
      labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor,
          hoverBackgroundColor,
        },
      ],
    };
  }, [analyticsData]);

  const chartOptions = useMemo(
    () => ({
      ...pieOptions,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick: (evt: any, active: any[]) => {
        if (!active.length) return;
        const idx = active[0].index;
        const label = pieData.labels[idx];
        setCategory(label);
        setCurrentPage(1);
      },
    }),
    [pieData]
  );

  const categoryOptions = [
    { value: "", label: "Categoría" },
    ...(culturalPlaceCategories?.map((cat) => ({ value: cat, label: cat })) ??
      []),
  ];

  const isLoading = isLoadingCulturalPlaces || isLoadingAnalytics;
  const isError = Boolean(errorCulturalPlaces || errorAnalytics);

  if (isLoading && !isError) {
    return <LoadingIndicator message="Cargando eventos populares..." />;
  }

  if (isError) {
    return <ErrorMessage message="Error al cargar los eventos" />;
  }

  return (
    <MainLayout title="Lugares culturales populares">
      <div className="d-md-flex">
        <div className="col-md-4 d-flex flex-column align-items-center mt-4">
          <Select
            className="shadow"
            options={categoryOptions}
            value={category}
            onChange={setCategory}
            style={{ maxWidth: 300 }}
          />
          <PieChart
            data={pieData}
            options={chartOptions}
            className="m-4 h-100"
          />
        </div>
        <div className="flex-column col-md-8 row">
          <div className="row g-4 m-0">
            {data && data.items.length > 0 ? (
              data.items.map((culturalPlace: CulturalPlace, i: number) => {
                const rq = reviewsQueries[i];
                const reviews = rq.data ?? [];
                const totalReviews = reviews.length;
                const avgRating =
                  totalReviews > 0
                    ? reviews.reduce((sum, r) => sum + r.rating, 0) /
                      totalReviews
                    : 0;

                return (
                  <div className="col-md-6" key={culturalPlace.id} style={{ height }}>
                    <Card
                      image={culturalPlace.image}
                      title={culturalPlace.title}
                      location={culturalPlace.location}
                      rating={avgRating}
                      reviews={totalReviews}
                      description={culturalPlace.description}
                      className="rounded bg-light shadow h-100 w-100"
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
              })
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
