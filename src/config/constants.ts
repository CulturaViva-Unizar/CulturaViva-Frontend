import { SelectOption } from "../components/ui/select";
import { Categories } from "../features/enums";

export const USER_ROLE = 'usuario' as const
export const ADMIN_ROLE = 'admin' as const
export type Role = typeof USER_ROLE | typeof ADMIN_ROLE;
export const ALL_ROLES: Role[] = [USER_ROLE, ADMIN_ROLE];

export const CATEGORY_SELECT_OPTIONS: SelectOption[] = [
  { value: "", label: "Categoría" },
  ...Object.values(Categories).map((v) => ({
    value: v,
    label: v.charAt(0).toUpperCase() + v.slice(1),
  })),
];