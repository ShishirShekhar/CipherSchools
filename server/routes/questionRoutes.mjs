// Import the express router
import { Router } from "express";
// Import the question controller
import questionController from "../controllers/questionController.mjs";

// Create a new router
const router = Router();

// Define the routes
router.get("/", questionController.getAllQuestions);
router.post("/", questionController.createQuestion);
router.get("/:id", questionController.getQuestion);
router.put("/:id", questionController.updateQuestion);
router.delete("/:id", questionController.deleteQuestion);

// Export the router
export default router;
