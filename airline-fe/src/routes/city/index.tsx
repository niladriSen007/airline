import { cityListData, countryListData } from "@/mock_data/city";
import CityPage from "@/pages/city/CityPage";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const citiesQueryOptions = queryOptions({
  queryKey: ["cities"],
  queryFn: async () => {
    // const response = await get<PaginatedCityResponse>("/cities");
    // if (response.status === "error" || response.statusCode !== 200) {
    //   throw new Error(response.errors?.[0]?.message || "Unknown error");
    // }
    // return response.data ?? cityListData?.data; // Fallback to mock data if API fails
    return cityListData?.data; // Fallback to mock data if API fails
  },
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes gcTime > staleTime
});

export const countriesQueryOptions = queryOptions({
  queryKey: ["countries"],
  queryFn: async () => {
    // const response = await get<PaginatedCityResponse>("/countries");
    // if (response.status === "error" || response.statusCode !== 200) {
    //   throw new Error(response.errors?.[0]?.message || "Unknown error");
    // }
    // return response.data ?? cityListData?.data; // Fallback to mock data if API fails
    return countryListData?.data; // Fallback to mock data if API fails
  },
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes gcTime > staleTime
});

export const Route = createFileRoute("/city/")({
  loader: async ({ context: { queryClient } }) => {
    Promise.all([
      queryClient.ensureQueryData(citiesQueryOptions),
      queryClient.ensureQueryData(countriesQueryOptions),
    ]);
  },
  component: CityPage,
});
