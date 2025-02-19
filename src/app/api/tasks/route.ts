import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Task } from "@/lib/models/task"
import { z } from "zod"

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["todo", "in-progress", "done", "timeout"]),
  deadline: z.string().datetime(),
  assignedTo: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    await connectDB()
    const json = await req.json()
    const data = taskSchema.parse(json)
    
    const task = await Task.create(data)
    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error("Failed to create task:", error)
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectDB()
    const tasks = await Task.find().sort({ createdAt: -1 })
    return NextResponse.json(tasks)
  } catch (error) {
    console.error("Failed to fetch tasks:", error)
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    )
  }
}
