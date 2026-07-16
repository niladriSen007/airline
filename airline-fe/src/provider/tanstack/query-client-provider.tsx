import { queryClient, router } from "@/exports";
import { QueryClientProvider as Wrapper } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";

export const QueryClientProvider = () => {
  return (
    <Wrapper client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </Wrapper>
  );
};
