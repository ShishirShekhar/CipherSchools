import mongoose from "mongoose";

// Define the MongoDB URI. Ensure it's defined in your environment variables.
const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI environment variable is not defined.");
}

// Function to connect to the MongoDB database using Mongoose
async function connectToDatabase() {
  try {
    // Use Mongoose to connect to the MongoDB server.
    await mongoose.connect(uri, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    // Log the error and rethrow it to handle it upstream.
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

export default connectToDatabase;
