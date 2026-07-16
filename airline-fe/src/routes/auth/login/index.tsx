import { loginSearchSchema } from "@/features/auth/login/_schema";
import { LoginPage } from "@/pages/auth/LoginPage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login/")({
  validateSearch: loginSearchSchema,
  beforeLoad: ({ context, search }) => {
    // Redirect if already authenticated
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search?.searchParams?.redirect || "/" });
    }
  },
  notFoundComponent: () => <div>Login route not found</div>,
  errorComponent: ({ error }) => (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
    </div>
  ),
  component: LoginPage,
});
