"use client"

import { MoreHorizontal } from "lucide-react"
import { format } from "date-fns"
import type { Task } from "./task-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useTaskContext } from "./task-context"
import { useState } from "react"
import { toast } from "sonner"


interface TaskCardProps {
  task: Task
}

type Status = "todo" | "in-progress" | "done"

export default function TaskCard({ task }: TaskCardProps) {
  const { dispatch } = useTaskContext()
  const [isDeleting, setIsDeleting] = useState(false)

  console.log("task: ", task)

  const priorityColors = {
    low: "bg-yellow-500/10 text-yellow-500",
    medium: "bg-blue-500/10 text-blue-500",
    high: "bg-red-500/10 text-red-500",
  }

  const handleStatusChange = async (newStatus: Status) => {
    try {
      const response = await fetch(`/api/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error("Failed to update task")

      const updatedTask = await response.json()
      dispatch({ type: "UPDATE_TASK", task: updatedTask })
    } catch (error) {
      console.error("Failed to update task status:", error)
      toast("Failed to update task status")
    }
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const response = await fetch(`/api/tasks/${task._id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete task")

      dispatch({ type: "DELETE_TASK", id: task._id })
      toast("Task deleted successfully")
    } catch (error) {
      console.error("Failed to delete task:", error)
      toast("Failed to delete task")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="rounded-lg bg-card p-4 shadow-sm">
      <div className="mb-2 flex items-start justify-between">
        <div>
          <Badge variant="outline" className={`${priorityColors[task.priority]} border-none`}>
            {task.priority}
          </Badge>
          <h3 className="mt-2 font-semibold">{task.title}</h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="-mr-2 -mt-2">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => handleStatusChange("todo")}>Move to Todo</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleStatusChange("in-progress")}>Move to In Progress</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleStatusChange("done")}>Move to Done</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleDelete} className="text-destructive" disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">{task.description}</p>
      <div className="text-xs text-muted-foreground">Deadline: {format(new Date(task.deadline), "MM/dd/yy")}</div>
    </div>
  )
}

