import jwt from "jsonwebtoken";
// Import submission model
import Submission from "../models/Submission.mjs";

// Define the submission controller object
const submissionController = {
  // Get all submissions
  getAllSubmissions: async (req, res) => {
    try {
      const submissions = await Submission.find({ isDeleted: false });
      return res.status(200).json({ submissions });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  // Create a submission
  createSubmission: async (req, res) => {
    try {
      const { testId, selections, endedAt } = req.body;
      if (!testId || !selections || !endedAt) {
        return res
          .status(400)
          .json({ error: "testId, selections, and endedAt are required" });
      }

      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      // Get the user ID from the access token
      const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const userId = user.id;

      const submission = await Submission.create({
        testId,
        userId,
        selections,
        endedAt,
      });
      return res.status(201).json({ submission });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
  // Get a submission
  getSubmission: async (req, res) => {
    try {
      const submission = await Submission.findById(req.params.id);
      return res.status(200).json({ submission });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  // Update a submission
  updateSubmission: async (req, res) => {
    try {
      const submission = await Submission.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      return res.status(200).json({ submission });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  // Delete a submission
  deleteSubmission: async (req, res) => {
    try {
      await Submission.findByIdAndUpdate(req.params.id, { isDeleted: true });
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

// Export the submission controller
export default submissionController;
