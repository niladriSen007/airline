import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface AuthState {
  isAuthenticated: boolean;
}

export interface RouterContext {
  auth: AuthState;
  queryClient: QueryClient;
}

const RootLayout = () => (
  <>
    <Outlet />
    <TanStackRouterDevtools position="bottom-right" />
  </>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});
