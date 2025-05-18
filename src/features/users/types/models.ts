import { Paginated } from "../../../shared/types/models";

export type User = {
  id: string;
  name: string;
  email: string;
  active: boolean;
  commentCount: number;
  commentCountEnabled: number;
  commentCountDisabled: number;
};

export type PaginatedUsersPage = Paginated<User>;
