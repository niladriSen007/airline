import { signupSearchSchema } from "@/features/auth/signup/_schema";
import { SignupPage } from "@/pages/auth/SignupPage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signup/")({
  validateSearch: signupSearchSchema,
  beforeLoad: ({ context, search }) => {
    // Redirect if already authenticated
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search?.searchParams?.redirect || "/" });
    }
  },
  notFoundComponent: () => <div>Signup route not found</div>,
  errorComponent: ({ error }) => (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
    </div>
  ),
  component: SignupPage,
});
