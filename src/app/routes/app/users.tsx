import { UserCard } from "../../../components/ui/user-card";
import SearchBar from "../../../components/ui/search-bar";
import { Select } from "../../../components/ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
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

function Users() {
  const [searchText, setSearchText] = useState<string>("");
  const [userFilterOption, setUserFilterOption] = useState("");
  const [order, setOrder] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const request: GetUsersRequest = useMemo(
    () => ({
      name: searchText,
      type: userFilterOption,
      sort,
      order,
      page: currentPage,
      limit: 6,
    }),
    [searchText, userFilterOption, sort, order, currentPage]
  );
  const { data: users = [], isLoading, error } = useGetUsers(request);
  const reviewsQueries = useQueries({
    queries: (users ?? []).map((u: User) => ({
      queryKey: ["reviews", u.id],
      queryFn: () => getReviewsByUser(u.id),
      enabled: !!users,
    })),
  });

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
          <button className="col btn rounded-pill shadow-sm text-nowrap">
            Comentarios
            <FontAwesomeIcon icon={faArrowDownWideShort} className="ps-2" />
          </button>
        </div>
      </div>
      <div className="row g-4">
        {users.map((user, i) => {
          const rq = reviewsQueries[i];
          const reviews = rq.data ?? [];

          return (
            <div className="col-md-4" key={i}>
              <UserCard
                className="rounded bg-light shadow"
                userId={user.id}
                username={user.name}
                totalComments={reviews.length}
                deletedComments={0}
                isEnabledInit={user.active}
              />
            </div>
          );
        })}
      </div>
      <BootstrapPagination
        currentPage={currentPage}
        totalPages={1}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </MainLayout>
  );
}

export default Users;
