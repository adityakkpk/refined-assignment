import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { 
    type: String, 
    enum: ["low", "medium", "high"],
    required: true 
  },
  status: { 
    type: String, 
    enum: ["todo", "in-progress", "done", "timeout"],
    required: true 
  },
  deadline: { type: Date, required: true },
  assignedTo: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema)
