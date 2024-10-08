// Import the express router
import { Router } from "express";
// Import the user controller
import userController from "../controllers/userController.mjs";

// Create a new router
const router = Router();

// Define the routes
router.get("/me", userController.getUser);

// Export the router
export default router;
