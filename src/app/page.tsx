import { Suspense } from "react"
import TaskBoard from "@/components/task-board"
import { TaskProvider } from "@/components/task-context"
import { Skeleton } from "@/components/ui/skeleton"

export default function Page() {
  return (
    <TaskProvider>
      <main className="container mx-auto p-4">
        <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
          <TaskBoard />
        </Suspense>
      </main>
    </TaskProvider>
  )
}

