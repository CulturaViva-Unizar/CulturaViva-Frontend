import { UserCard } from "../../../components/ui/user-card";
import SearchBar from "../../../components/ui/search-bar";
import { Select } from "../../../components/ui/select";
import BootstrapPagination from "../../../components/ui/bootstrap-pagination";
import MainLayout from "../../../components/layouts/main-layout";
import { useGetUsers } from "../../../features/users/api/get-users";
import LoadingIndicator from "../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../components/errors/error-message";
import { useMemo, useState } from "react";
import { GetUsersRequest } from "../../../types/api";
import { USER_ANALYTICS_FILTER_OPTIONS } from "../../../shared/constants/select-options";
import { useQueries } from "@tanstack/react-query";
import { User } from "../../../features/users/types/models";
import { getReviewsByUser } from "../../../features/reviews/api/get-reviews-by-user";
import { SortButton } from "../../../components/ui/sort-button";

function Users() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [userFilterOption, setUserFilterOption] = useState("");
  const [sortBy, setSortBy] = useState<string>("");
  const request: GetUsersRequest = useMemo(
    () => ({
      name: searchText,
      type: userFilterOption,
      sort: sortBy == "" ? undefined : "comments",
      order: sortBy,
      page: currentPage,
      limit: 6,
    }),
    [searchText, userFilterOption, sortBy, currentPage]
  );
  const { data, isLoading, error } = useGetUsers(request);

  const reviewsQueries = useQueries({
    queries: (data?.items ?? []).map((u: User) => ({
      queryKey: ["reviews", u.id],
      queryFn: () => getReviewsByUser(u.id),
      enabled: !!data,
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
    return <LoadingIndicator message="Cargando usuarios..." />;
  }

  if (error) {
    return <ErrorMessage message="Error al cargar los usuarios" />;
  }

  return (
    <MainLayout title="Usuarios">
      <div className="py-3 row gap-2 justify-content-center">
        <div className="row col-12 col-md-3">
          <SearchBar
            value={searchText}
            onSearch={setSearchText}
            className="shadow-sm rounded-pill"
          />
        </div>
        <div
          className="row col-12 col-md-3 gap-2 gx-2 py-1 flex-nowrap overflow-x-auto hide-scrollbar"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <Select
            options={USER_ANALYTICS_FILTER_OPTIONS}
            value={userFilterOption}
            onChange={setUserFilterOption}
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
        {data!.items.map((user: User, i: number) => {
          const rq = reviewsQueries[i];
          const reviews = rq.data ?? [];
          const totalReviews = reviews.length;

          return (
            <div className="col-md-4" key={user.id}>
              <UserCard
                className="rounded bg-light shadow"
                userId={user.id}
                username={user.name}
                totalComments={totalReviews}
                deletedComments={0}
                isEnabledInit={user.active}
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

export default Users;
