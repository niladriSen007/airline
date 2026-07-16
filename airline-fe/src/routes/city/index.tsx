import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/city/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello city!</div>;
}
