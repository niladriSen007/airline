import CreateCityPage from "@/pages/city/CreateCityPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/city/create/")({
  component: CreateCityLayout,
});

function CreateCityLayout() {
  return (
    <div className="h-[calc(100vh-5rem)] flex items-center justify-center">
      <CreateCityPage />
    </div>
  );
}
