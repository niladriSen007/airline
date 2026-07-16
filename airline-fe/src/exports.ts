import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  context: {
    auth: {
      isAuthenticated: false,
      login: () => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
      },
      logout: () => {},
      user: null,
    },
    queryClient,
  },
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});
