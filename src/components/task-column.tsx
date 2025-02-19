"use client"

import type { Task, Status } from "./task-context"
import TaskCard from "./task-card"

interface TaskColumnProps {
  title: string
  tasks: Task[]
  status: Status
}

export default function TaskColumn({ title, tasks, status }: TaskColumnProps) {
  return (
    <div className="flex flex-col rounded-lg bg-muted/50 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs">{tasks.length}</span>
      </div>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

