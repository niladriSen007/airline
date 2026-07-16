import { post } from "@/lib/apiMethod";
import { Route } from "@/routes/__root";
import { useAuthStore } from "@/store/auth/auth-store";
import type { LoginRequest, UserResponse } from "@/store/auth/auth-types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export function useLogin(redirectTo: string = "/") {
  const { setUser, setError, setLoading } = useAuthStore();
  const router = useRouter();
  const { auth } = Route.useRouteContext();

  const loginMutation = useMutation({
    mutationFn: async (loginData: LoginRequest) => {
      setLoading();
      const response = await post<typeof loginData, UserResponse>(
        "/auth/login",
        loginData,
      );
      if (response.status === "error" || response.statusCode !== 200) {
        throw new Error(response.errors?.[0]?.message || "Unknown error");
      }
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data?.userResponse || null);
      auth.isAuthenticated = true;
      router.history.push(redirectTo);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  return { loginMutation };
}
