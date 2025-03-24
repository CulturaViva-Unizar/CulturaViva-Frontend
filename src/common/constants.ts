export const USER_ROLE = 'usuario' as const
export const ADMIN_ROLE = 'admin' as const
export const GUEST_ROLE = 'guest' as const;
export type Role = typeof USER_ROLE | typeof ADMIN_ROLE | typeof GUEST_ROLE;
export const ALL_ROLES: Role[] = [USER_ROLE, ADMIN_ROLE, GUEST_ROLE];