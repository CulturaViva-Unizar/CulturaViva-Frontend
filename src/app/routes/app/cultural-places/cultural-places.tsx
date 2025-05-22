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
import { useState, useMemo, useEffect } from "react";
import { useQueries } from "@tanstack/react-query";
import { getReviewsByCulturalPlace } from "../../../../features/reviews/api/get-reviews-by-cultural-place";
import BootstrapPagination from "../../../../components/ui/bootstrap-pagination";
import { SortButton } from "../../../../components/ui/sort-button";
import { useGetCulturalPlaceCategories } from "../../../../features/cultural-places/api/get-cultural-place-categories";

function CulturalPlaces() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("desc");
  const [height, setHeight] = useState(getHeightValue());

  function getHeightValue() {
    return window.innerWidth < 768 ? 200 : 180;
  }
  
  useEffect(() => {
    const onResize = () => {
      setHeight(getHeightValue());
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const request = useMemo(
    () => ({
      name: searchText,
      category,
      sort: "comments",
      order: orderBy,
      page: currentPage,
      limit: 6,
    }),
    [searchText, category, orderBy, currentPage]
  );
  const {
    data,
    isLoading: isLoadingCulturalPlaces,
    error: errorCulturalPlaces,
  } = useGetCulturalPlaces(request);
  const {
    data: culturalPlaceCategories,
    isLoading: isLoadingCulturalPlaceCategories,
    error: errorCulturalPlaceCategories,
  } = useGetCulturalPlaceCategories();



  const categoryOptions = [
    { value: "", label: "Categoría" },
    ...(culturalPlaceCategories?.filter(cat => cat !== "").map((cat) => ({
      value: cat,
      label: cat,
    })) ?? []),
  ];

  const reviewsQueries = useQueries({
    queries: (data?.items ?? []).map((p: CulturalPlace) => ({
      queryKey: ["reviews", p.id],
      queryFn: () => getReviewsByCulturalPlace(p.id),
      enabled: !!data,
    })),
  });

  const handleOrderBy = () => {
    if (!orderBy || orderBy == "asc") {
      setOrderBy("desc");
    } else {
      setOrderBy("asc");
    }
  };

  const isLoading = isLoadingCulturalPlaceCategories || isLoadingCulturalPlaces;
  const isError = Boolean(errorCulturalPlaceCategories || errorCulturalPlaces);

  if (isLoading && !isError) {
    return <LoadingIndicator message="Cargando eventos..." />;
  }

  if (isError) {
    return <ErrorMessage message="Error al cargar los eventos" />;
  }

  return (
    <MainLayout title="Todos los lugares culturales">
      <div className="py-3 row gap-2 justify-content-center">
        <div className="row col-12 col-md-4">
          <SearchBar
            className="rounded-pill shadow-sm"
            value={searchText}
            onSearch={setSearchText}
          />
        </div>
        <div
          className="row col-12 col-md-3 gap-2 gx-2 py-1 flex-nowrap overflow-x-auto hide-scrollbar"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <Select
            className="col shadow-sm"
            options={categoryOptions}
            value={category}
            onChange={setCategory}
            style={{ maxWidth: 150 }}
          />
          <SortButton
            label="Comentarios"
            sortBy={orderBy}
            onClick={handleOrderBy}
          />
        </div>
      </div>
      <div className="row g-4">
        {data?.items && data.items.length > 0 ? (
          data.items.map((culturalPlace: CulturalPlace, i: number) => {
            const rq = reviewsQueries[i];
            const reviews = rq.data ?? [];
            const totalReviews = reviews.length;
            const avgRating =
              totalReviews > 0
                ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
                : 0;

            return (
              <div className="col-md-4" key={culturalPlace.id} style={{ height}}>
                <Card
                  image={culturalPlace.image}
                  title={culturalPlace.title}
                  location={culturalPlace.location}
                  rating={avgRating}
                  reviews={totalReviews}
                  description={culturalPlace.description}
                  className="h-100 w-100 rounded bg-light shadow"
                  onClick={() =>
                    navigate(
                      paths.app.culturalPlaces.details.getHref(culturalPlace.id)
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
    </MainLayout>
  );
}

export default CulturalPlaces;
