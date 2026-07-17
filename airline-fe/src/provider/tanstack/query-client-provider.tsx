import { queryClient, router } from "@/exports";
import { QueryClientProvider as Wrapper } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "../theme/theme-provider";

export const QueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Wrapper client={queryClient}>
        {children}
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Wrapper>
    </ThemeProvider>
  );
};
