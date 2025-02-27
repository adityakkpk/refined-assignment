import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

// Connect to MongoDB
const connection: ConnectionObject = {};

export async function connectDB(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to DB");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    
    connection.isConnected = db.connections[0].readyState;

    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Database connection error", error);

    process.exit(1);
  }
}
