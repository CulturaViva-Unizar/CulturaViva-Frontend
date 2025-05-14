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
    unauthorized: {
      path: "/unauthorized",
      getHref: () => "/unauthorized",
    },
  },
  app: {
    path: "/app",
    getHref: () => "/app",
    bookmarks: {
      path: "bookmarks",
      getHref: () => "/app/bookmarks",
      admin: false,
    },
    events: {
      path: "events",
      getHref: () => "/app/events",
      admin: true,
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
        admin: false,
      },
      upcoming: {
        path: "upcoming",
        getHref: () => "/app/events/upcoming",
        admin: false,
      },
      details: {
        path: ":eventId",
        getHref: (id: string) => `/app/events/${id}`,
      },
    },
    culturalPlaces: {
      path: "places",
      getHref: () => "/app/places",
      admin: true,
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
      admin: true,
    },
    comments: {
      path: "comments/user/:userId",
      getHref: (id: string) => `/app/comments/user/${id}`,
      admin: true,
    },
    chats: {
      path: "chats",
      getHref: () => "/app/chats",
      admin: false,
      chat: {
        path: ":chatId",
        getHref: (id: string) => `/app/chats/${id}`,
        admin: false,
      },
    },
    analytics: {
      path: "analytics",
      getHref: () => "/app/analytics",
      admin: true,
    },
  },
} as const;
