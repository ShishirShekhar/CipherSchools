// Import required modules
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
// Load Environment Variables
import "./loadEnvironment.mjs";
// Import database connection
import connectToDatabase from "./config/database.mjs";
// Import required routes
import userRoutes from "./routes/userRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import testRoutes from "./routes/testRoutes.mjs";
import questionRoutes from "./routes/questionRoutes.mjs";
import submissionRoutes from "./routes/submissionRoutes.mjs";
import authenticate from "./middlewares/authenticate.mjs";
// Import corn job
import cron from "./cron.mjs";

// Initialize app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Allow CORS from any origin
app.use(cors({ origin: true, credentials: true }));

// Connect to database
connectToDatabase().catch((error) => console.log(error));

// Routes
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server is running successfully!" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", authenticate, userRoutes);
app.use("/api/v1/tests", authenticate, testRoutes);
app.use("/api/v1/questions", authenticate, questionRoutes);
app.use("/api/v1/submissions", authenticate, submissionRoutes);

// Define port
const port = process.env.PORT || 8000;

app.listen(port, (error) => {
  if (!error) {
    console.log("Server is successfully running on port " + port);
    cron.start();
  } else console.log("Error occurred, server can't start", error);
});
