import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/notFound')({
  component: () => <div className="h-[80vh] flex justify-center align-middle items-center">
  <h1 className="text-4xl font-bold">404 Not Found</h1>
</div>
})

