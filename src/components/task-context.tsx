"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode, useEffect, useState } from "react"

export type Priority = "low" | "medium" | "high"
export type Status = "todo" | "in-progress" | "done" | "timeout"

export interface Task {
  id: string
  title: string
  description: string
  priority: Priority
  status: Status
  deadline: string
  assignedTo?: string
  createdAt: string
}

interface TaskState {
  tasks: Task[]
}

type TaskAction =
  | { type: "ADD_TASK"; task: Task }
  | { type: "UPDATE_TASK"; task: Task }
  | { type: "DELETE_TASK"; id: string }
  | { type: "SET_TASKS"; tasks: Task[] }

const TaskContext = createContext<{
  state: TaskState
  dispatch: React.Dispatch<TaskAction>
  isLoading: boolean
} | null>(null)

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [action.task, ...state.tasks] }
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.task.id ? action.task : task)),
      }
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      }
    case "SET_TASKS":
      return { ...state, tasks: action.tasks }
    default:
      return state
  }
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, { tasks: [] })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const eventSource = new EventSource("/api/tasks/sse")

    eventSource.onmessage = (event) => {
      const tasks = JSON.parse(event.data)
      dispatch({ type: "SET_TASKS", tasks })
      setIsLoading(false)
    }

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return <TaskContext.Provider value={{ state, dispatch, isLoading }}>{children}</TaskContext.Provider>
}

export function useTaskContext() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider")
  }
  return context
}

