import { ADMIN_ROLE, ALL_ROLES } from "./constants";

export const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },
  auth: {
    login: {
      path: "/login",
      getHref: (redirectTo?: string | null | undefined) =>
        `/login${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
    register: {
      path: "/register",
      getHref: (redirectTo?: string | null | undefined) =>
        `/register${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
    changePassword: {
      path: "/change-password",
      getHref: () => "/change-password",
    },
    unauthorized: {
      path: "/unauthorized",
      getHref: (redirectTo?: string | null | undefined) =>
        `/unauthorized${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
  },
  app: {
    path: "/app",
    getHref: () => "/app",
    bookmarks: {
      path: "bookmarks",
      getHref: () => "/app/bookmarks",
      allowedRoles: ALL_ROLES,
    },
    events: {
      path: "events",
      getHref: () => "/app/events",
      allowedRoles: [ADMIN_ROLE],
      suggested: {
        path: "suggested",
        getHref: () => "/app/events/suggested",
      },
      popular: {
        path: "popular",
        getHref: () => "/app/events/popular",
      },
      assisted: {
        path: "assisted",
        getHref: () => "/app/events/assisted",
        allowedRoles: ALL_ROLES,
      },
      upcoming: {
        path: "upcoming",
        getHref: () => "/app/events/upcoming",
        allowedRoles: ALL_ROLES,
      },
      details: {
        path: ":eventId",
        getHref: (id: string) => `/app/events/${id}`,
      },
    },
    culturalPlaces: {
      path: "places",
      getHref: () => "/app/places",
      allowedRoles: [ADMIN_ROLE],
      suggested: {
        path: "suggested",
        getHref: () => "/app/places/suggested",
      },
      popular: {
        path: "popular",
        getHref: () => "/app/places/popular",
      },
      details: {
        path: ":culturalPlaceId",
        getHref: (id: string) => `/app/places/${id}`,
      },
    },
    users: {
      path: "users",
      getHref: () => "/app/users",
      allowedRoles: [ADMIN_ROLE],
    },
    comments: {
      path: "comments/user/:userId",
      getHref: (id: number) => `/app/comments/user/${id}`,
      allowedRoles: [ADMIN_ROLE],
    },
    chats: {
      path: "chats",
      getHref: () => "/app/chats",
      allowedRoles: ALL_ROLES,
    },
    analytics: {
      path: "analytics",
      getHref: () => "/app/analytics",
      allowedRoles: [ADMIN_ROLE],
    },
  },
} as const;
