import { UserCard } from "../../../features/users/components/user-card";
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
import { User } from "../../../features/users/types/models";
import { SortButton } from "../../../components/ui/sort-button";

function Users() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [userFilterOption, setUserFilterOption] = useState("");
  const [orderBy, setOrderBy] = useState<string>("desc");
  const request: GetUsersRequest = useMemo(
    () => ({
      name: searchText,
      userType: userFilterOption,
      sort: "comments",
      order: orderBy,
      page: currentPage,
      limit: 6,
    }),
    [searchText, userFilterOption, orderBy, currentPage]
  );
  const { data, isLoading, error } = useGetUsers(request);

  const handleOrderBy = () => {
    if (orderBy == "asc") {
      setOrderBy("desc");
    } else {
      setOrderBy("asc");
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
            sortBy={orderBy}
            onClick={handleOrderBy}
          />
        </div>
      </div>
      <div className="row g-4">
        {data?.items && data.items.length > 0 ? (
          data.items.map((user: User) => (
            <div className="col-md-4" key={user.id}>
              <UserCard
                className="h-100 rounded bg-light shadow"
                userId={user.id}
                username={user.name}
                totalComments={user.commentCount}
                deletedComments={user.commentCountDisabled}
                isEnabled={user.active}
              />
            </div>
          ))
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

export default Users;
