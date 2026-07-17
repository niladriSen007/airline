import CityLayout from "@/components/layouts/CityLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/city")({
  component: CityLayout,
});
