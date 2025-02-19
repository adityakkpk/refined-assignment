import { connectDB } from "@/lib/db"
import { Task } from "@/lib/models/task"
import { headers } from "next/headers"

export async function GET() {
  const headersList = headers()
  const response = new Response(
    new ReadableStream({
      async start(controller) {
        await connectDB()
        
        // Initial data
        const tasks = await Task.find().sort({ createdAt: -1 })
        controller.enqueue(`data: ${JSON.stringify(tasks)}\n\n`)

        // Watch for changes
        const changeStream = Task.watch()
        
        changeStream.on("change", async () => {
          const updatedTasks = await Task.find().sort({ createdAt: -1 })
          controller.enqueue(`data: ${JSON.stringify(updatedTasks)}\n\n`)
        })

        // Keep connection alive
        const keepAlive = setInterval(() => {
          controller.enqueue(": keepalive\n\n")
        }, 30000)

        // Cleanup
        await headersList.get("connection")?.includes("close")
        setTimeout(() => {
          clearInterval(keepAlive)
          changeStream.close()
          controller.close()
        }, 0)
      },
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    }
  )

  return response
}
