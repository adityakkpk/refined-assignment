"use client"

import { Clock, ListTodo, CheckCircle } from "lucide-react"
import type { Task } from "./task-context"

interface TaskMetricsProps {
  tasks: Task[]
}

export default function TaskMetrics({ tasks }: TaskMetricsProps) {
  const expiredTasks = tasks.filter((task) => new Date(task.deadline) < new Date()).length
  const activeTasks = tasks.filter((task) => task.status !== "done").length
  const completedTasks = tasks.filter((task) => task.status === "done").length

  return (
    <div className="flex flex-col gap-4">
      <div className="w-64 rounded-lg bg-card p-4 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <Clock className="h-5 w-5 text-destructive" />
          <span className="text-sm font-medium">Expired Tasks</span>
        </div>
        <p className="text-2xl font-bold">{expiredTasks}</p>
      </div>

      <div className="w-64 rounded-lg bg-card p-4 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <ListTodo className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">All Active Tasks</span>
        </div>
        <p className="text-2xl font-bold">{activeTasks}</p>
      </div>

      <div className="w-64 rounded-lg bg-card p-4 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-success" />
          <span className="text-sm font-medium">Completed Tasks</span>
        </div>
        <p className="text-2xl font-bold">
          {completedTasks}/{tasks.length}
        </p>
      </div>
    </div>
  )
}

