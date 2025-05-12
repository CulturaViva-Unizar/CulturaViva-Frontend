import { UserResponse } from "../../../types/api";
import { User } from "../types/models";

export const mapUserResponseToUser = (src: UserResponse): User => ({
  id: src._id,
  name: src.name,
  email: src.email,
  active: src.active,
});
