import { Paginated } from "../../../shared/types/models";

export type User = {
  id: string;
  name: string;
  email: string;
  active: boolean;
};

export type PaginatedUsersPage = Paginated<User>;
