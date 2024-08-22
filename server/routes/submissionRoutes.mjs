// Import the express router
import { Router } from "express";
// Import the submission controller
import submissionController from "../controllers/submissionController.mjs";

// Create a new router
const router = Router();

// Define the routes
router.get("/", submissionController.getAllSubmissions);
router.post("/", submissionController.createSubmission);
router.get("/:id", submissionController.getSubmission);
router.put("/:id", submissionController.updateSubmission);
router.patch("/:id/mail-sent", submissionController.updateMailSent);
router.delete("/:id", submissionController.deleteSubmission);

// Export the router
export default router;
