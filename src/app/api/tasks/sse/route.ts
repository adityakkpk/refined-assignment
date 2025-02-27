import { connectDB } from "@/lib/db"
import { Task } from "@/lib/models/task"
import { headers } from "next/headers"

export async function GET(request: Request) {
  try {
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

          // Handle cleanup
          const cleanup = () => {
            clearInterval(keepAlive)
            changeStream.close()
            controller.close()
          }

          // Safety cleanup after 30 minutes
          setTimeout(cleanup, 30 * 60 * 1000)

          // Handle client disconnection
          request.signal.addEventListener('abort', cleanup)
        },
      }),
      {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
        },
      }
    )

    return response
  } catch (error) {
    console.error("SSE Error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
