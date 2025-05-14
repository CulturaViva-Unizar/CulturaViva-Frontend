/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { paths } from "../config/paths";
import ProtectedRoute from "../components/protected-route";
import Chats from "./routes/app/chats";

const convert = (queryClient: QueryClient) => (module: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = module;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: () => import("./routes/landing").then(convert(queryClient)),
    },
    {
      path: paths.app.path,
      lazy: () => import("./routes/landing").then(convert(queryClient)),
    },
    {
      path: paths.auth.login.path,
      lazy: () => import("./routes/auth/login").then(convert(queryClient)),
    },
    {
      path: paths.auth.register.path,
      lazy: () => import("./routes/auth/register").then(convert(queryClient)),
    },
    {
      path: paths.auth.unauthorized.path,
      lazy: () =>
        import("./routes/auth/unauthorized").then(convert(queryClient)),
    },
    {
      path: paths.app.path,
      element: <Outlet />,
      children: [
        {
          path: paths.app.bookmarks.path,
          lazy: () =>
            import("./routes/app/bookmarks").then((module) => {
              const route = convert(queryClient)(module);
              return {
                ...route,
                Component: (props: any) => (
                  <ProtectedRoute
                    admin={paths.app.events.assisted.admin}
                  >
                    <route.Component {...props} />
                  </ProtectedRoute>
                ),
              };
            }),
        },
        {
          path: paths.app.events.path,
          element: <Outlet />,
          children: [
            {
              index: true,
              lazy: () =>
                import("./routes/app/events/events").then((module) => {
                  const route = convert(queryClient)(module);
                  return {
                    ...route,
                    Component: (props: any) => (
                      <ProtectedRoute
                        admin={paths.app.events.admin}
                      >
                        <route.Component {...props} />
                      </ProtectedRoute>
                    ),
                  };
                }),
            },
            {
              path: paths.app.events.suggested.path,
              lazy: () =>
                import("./routes/app/events/suggested-events").then(
                  convert(queryClient)
                ),
            },
            {
              path: paths.app.events.popular.path,
              lazy: () =>
                import("./routes/app/events/popular-events").then(
                  convert(queryClient)
                ),
            },
            {
              path: paths.app.events.assisted.path,
              lazy: () =>
                import("./routes/app/events/assisted-events").then((module) => {
                  const route = convert(queryClient)(module);
                  return {
                    ...route,
                    Component: (props: any) => (
                      <ProtectedRoute
                        admin={paths.app.events.assisted.admin}
                      >
                        <route.Component {...props} />
                      </ProtectedRoute>
                    ),
                  };
                }),
            },
            {
              path: paths.app.events.upcoming.path,
              lazy: () =>
                import("./routes/app/events/upcoming-events").then((module) => {
                  const route = convert(queryClient)(module);
                  return {
                    ...route,
                    Component: (props: any) => (
                      <ProtectedRoute
                        admin={paths.app.events.upcoming.admin}
                      >
                        <route.Component {...props} />
                      </ProtectedRoute>
                    ),
                  };
                }),
            },
            {
              path: paths.app.events.details.path,
              lazy: () =>
                import("./routes/app/events/event-details").then(
                  convert(queryClient)
                ),
            },
          ],
        },
        {
          path: paths.app.culturalPlaces.path,
          element: <Outlet />,
          children: [
            {
              index: true,
              lazy: () =>
                import("./routes/app/cultural-places/cultural-places").then(
                  (module) => {
                    const route = convert(queryClient)(module);
                    return {
                      ...route,
                      Component: (props: any) => (
                        <ProtectedRoute
                          admin={paths.app.culturalPlaces.admin}
                        >
                          <route.Component {...props} />
                        </ProtectedRoute>
                      ),
                    };
                  }
                ),
            },
            {
              path: paths.app.culturalPlaces.suggested.path,
              lazy: () =>
                import(
                  "./routes/app/cultural-places/suggested-cultural-places"
                ).then(convert(queryClient)),
            },
            {
              path: paths.app.culturalPlaces.popular.path,
              lazy: () =>
                import(
                  "./routes/app/cultural-places/popular-cultural-places"
                ).then(convert(queryClient)),
            },
            {
              path: paths.app.culturalPlaces.details.path,
              lazy: () =>
                import(
                  "./routes/app/cultural-places/cultural-place-details"
                ).then(convert(queryClient)),
            },
          ],
        },
        {
          path: paths.app.users.path,
          lazy: () =>
            import("./routes/app/users").then((module) => {
              const route = convert(queryClient)(module);
              return {
                ...route,
                Component: (props: any) => (
                  <ProtectedRoute admin={paths.app.users.admin}>
                    <route.Component {...props} />
                  </ProtectedRoute>
                ),
              };
            }),
        },
        {
          path: paths.app.comments.path,
          lazy: () =>
            import("./routes/app/user-reviews").then((module) => {
              const route = convert(queryClient)(module);
              return {
                ...route,
                Component: (props: any) => (
                  <ProtectedRoute
                    admin={paths.app.comments.admin}
                  >
                    <route.Component {...props} />
                  </ProtectedRoute>
                ),
              };
            }),
        },
        {
          path: paths.app.chats.path,
          element: (
            <ProtectedRoute admin={paths.app.chats.admin}>
              <Chats />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: (
                <h3 className="d-flex bg-light align-items-center justify-content-center">
                  Selecciona un chat
                </h3>
              ),
            },
            {
              path: ":chatId",
              lazy: () =>
                import("./routes/app/chat-conversation").then(
                  convert(queryClient)
                ),
            },
          ],
        },
        {
          path: paths.app.analytics.path,
          lazy: () =>
            import("./routes/app/analytics").then((module) => {
              const route = convert(queryClient)(module);
              return {
                ...route,
                Component: (props: any) => (
                  <ProtectedRoute
                    admin={paths.app.analytics.admin}
                  >
                    <route.Component {...props} />
                  </ProtectedRoute>
                ),
              };
            }),
        },
      ],
    },
    {
      path: "*",
      lazy: () => import("./routes/not-found").then(convert(queryClient)),
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();
  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);
  return <RouterProvider router={router} />;
};
