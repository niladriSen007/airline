import { CreateCityRequest } from "@/features/city/_types";
import { post } from "@/lib/apiMethod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export const useCreateCity = () => {
  const router = useRouter();
  const createCityMutation = useMutation({
    mutationFn: async (data: CreateCityRequest) => {
      const response = await post<CreateCityRequest, any>("/cities", data);

      if (response.status === "error" || response.statusCode !== 200) {
        throw new Error(response.errors?.[0]?.message || "Unknown error");
      }
      return response.data;
    },
    onSuccess: () => {
      router.history.push("/city");
    },
  });

  return createCityMutation;
};
