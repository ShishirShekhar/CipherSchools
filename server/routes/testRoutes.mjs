// Import the express router
import { Router } from "express";
// Import the test controller
import testController from "../controllers/testController.mjs";

// Create a new router
const router = Router();

// Define the routes
router.get("/", testController.getAllTests);
router.post("/", testController.createTest);
router.get("/:id", testController.getTest);
router.put("/:id", testController.updateTest);
router.delete("/:id", testController.deleteTest);

// Export the router
export default router;
