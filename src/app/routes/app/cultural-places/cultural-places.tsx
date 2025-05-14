import SearchBar from "../../../../components/ui/search-bar";
import { Select } from "../../../../components/ui/select";
import { Card } from "../../../../components/ui/card";
import MainLayout from "../../../../components/layouts/main-layout";
import { useNavigate } from "react-router";
import { paths } from "../../../../config/paths";
import { useGetCulturalPlaces } from "../../../../features/cultural-places/api/get-cultural-places";
import { CulturalPlace } from "../../../../features/cultural-places/types/models";
import { ErrorMessage } from "../../../../components/errors/error-message";
import LoadingIndicator from "../../../../components/ui/loading-indicator";
import { CATEGORY_SELECT_OPTIONS } from "../../../../shared/constants/select-options";
import { useState, useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { getReviewsByCulturalPlace } from "../../../../features/reviews/api/get-reviews-by-cultural-place";
import BootstrapPagination from "../../../../components/ui/bootstrap-pagination";
import { SortButton } from "../../../../components/ui/sort-button";

function CulturalPlaces() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const request = useMemo(
    () => ({
      name: searchText,
      category,
      sort: sortBy == "" ? undefined : "comments",
      order: sortBy,
      page: 1,
      limit: 8,
    }),
    [searchText, category, sortBy]
  );
  const { data, isLoading, error } = useGetCulturalPlaces(request);
  const culturalPlaces = data?.items.filter(
    (p) => p.coordinates && p.coordinates.latitude && p.coordinates.longitude
  );
  const navigate = useNavigate();

  const reviewsQueries = useQueries({
    queries: (culturalPlaces ?? []).map((p: CulturalPlace) => ({
      queryKey: ["reviews", p.id],
      queryFn: () => getReviewsByCulturalPlace(p.id),
      enabled: !!culturalPlaces,
    })),
  });

  const handleOrderBy = () => {
    if (!sortBy || sortBy == "asc") {
      setSortBy("desc");
    } else {
      setSortBy("asc");
    }
  };

  if (isLoading && !error) {
    return <LoadingIndicator message="Cargando lugares culturales..." />;
  }

  if (error) {
    return <ErrorMessage message="Error al cargar los lugares culturales" />;
  }

  return (
    <MainLayout title="Todos los lugares culturales">
      <div className="mt-3 mb-5 d-flex flex-column align-items-start align-items-md-center justify-content-center">
        <div className="col-12 col-md-5">
          <SearchBar
            value={searchText}
            onSearch={setSearchText}
            className="shadow-sm rounded-pill"
          />
        </div>
        <div className="d-flex gap-3 mt-3">
          <Select
            options={CATEGORY_SELECT_OPTIONS}
            value=""
            onChange={setCategory}
            className="shadow-sm"
          />
          <SortButton
            label="Comentarios"
            sortBy={sortBy}
            onClick={handleOrderBy}
          />
        </div>
      </div>
      <div className="row g-4">
        {culturalPlaces &&
          culturalPlaces.map((culturalPlace: CulturalPlace, i: number) => {
            const rq = reviewsQueries[i];
            const reviews = rq.data ?? [];
            const totalReviews = reviews.length;
            const avgRating =
              totalReviews > 0
                ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
                : 0;

            return (
              <div className="col-md-3" key={culturalPlace.id}>
                <Card
                  title={culturalPlace.title}
                  location={culturalPlace.location}
                  rating={avgRating}
                  reviews={totalReviews}
                  description={culturalPlace.description}
                  className="h-100 rounded bg-light shadow"
                  onClick={() =>
                    navigate(
                      paths.app.culturalPlaces.details.getHref(culturalPlace.id)
                    )
                  }
                />
              </div>
            );
          })}
      </div>
      <BootstrapPagination
        currentPage={currentPage}
        totalPages={data!.totalPages}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </MainLayout>
  );
}

export default CulturalPlaces;
