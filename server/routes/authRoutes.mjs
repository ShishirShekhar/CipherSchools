// Import the express router
import { Router } from "express";
// Import Auth Controller
import authController from "../controllers/authController.mjs";
import authenticate from "../middlewares/authenticate.mjs";

// Create a new router
const router = Router();

// Define the routes
router.post("/signup", authController.userSignup);
router.post("/login", authController.userLogin);
router.post("/logout", authenticate, authController.userLogout);

// Export the router
export default router;
