import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer;

const connectDB = async () => {
  try {
    let mongoConString = process.env.MONGODB_CONNECTION_STRING;

    if (!mongoConString) {
      console.log(
        "No MongoDB connection string found in .env, using MongoMemoryServer for CI/test"
      );
      mongoServer = await MongoMemoryServer.create();
      mongoConString = mongoServer.getUri();
    }

    const conn = await mongoose.connect(mongoConString);
    console.log(`MongoDB connected: ${conn.connection.name}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Closing server, for CI testing
export const closeDB = async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
  console.log("MongoMemoryServer stopped");
};

export default connectDB;
