import Navbar from "@/components/shadcn-space/blocks/navbar-01/navbar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
