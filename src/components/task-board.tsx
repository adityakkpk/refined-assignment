"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import TaskColumn from "./task-column"
import TaskMetrics from "./task-metrics"
import AddTaskDialog from "./add-task-dialog"
import { useTaskContext, type Status } from "./task-context"

export default function TaskBoard() {
  const { state, isLoading } = useTaskContext()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTasks = state.tasks.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="mt-4 text-lg text-muted-foreground">Loading tasks...</p>
        </div>
      </div>
    )
  }

  const getTasksByStatus = (status: Status) => filteredTasks.filter((task) => task.status === status)

  return (
    <div className="h-full min-h-screen bg-background">
      <div className="flex items-center gap-2 border-b p-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Project"
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-4 p-4">
        <TaskMetrics tasks={state.tasks} />

        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
          <TaskColumn title="To Do" tasks={getTasksByStatus("todo")} status="todo" />
          <TaskColumn title="In Progress" tasks={getTasksByStatus("in-progress")} status="in-progress" />
          <TaskColumn title="Done" tasks={getTasksByStatus("done")} status="done" />
        </div>
      </div>

      <AddTaskDialog />
    </div>
  )
}

