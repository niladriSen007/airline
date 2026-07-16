import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/city/$cityId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/city/$cityId"!</div>
}
