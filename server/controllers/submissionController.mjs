// Import submission model
import Submission from "../models/Submission.mjs";

// Define the submission controller object
const submissionController = {
  // Get all submissions
  getAllSubmissions: async (req, res) => {
    try {
      const submissions = await Submission.find({ isDeleted: false });
      return res.status(200).json({ data: submissions, error: null });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  },
  // Create a submission
  createSubmission: async (req, res) => {
    try {
      const { testId, selections, endedAt } = req.body;
      if (!testId || !selections || !endedAt) {
        return res
          .status(400)
          .json({ data: null, error: "Required fields are missing" });
      }

      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        return res.status(401).json({ data: null, error: "Unauthorized" });
      }
      // Get the user ID from the access token
      const user = req.user;
      const userId = user._id;

      const submission = await Submission.create({
        testId,
        userId,
        selections,
        endedAt,
      });
      return res.status(201).json({ data: submission, error: null });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  },
  // Get a submission
  getSubmission: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res
          .status(400)
          .json({ data: null, error: "Submission ID is missing" });
      }
      const submission = await Submission.findById(id);
      if (!submission) {
        return res
          .status(404)
          .json({ data: null, error: "Submission not found" });
      }
      return res.status(200).json({ data: submission, error: null });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  },
  // Update a submission
  updateSubmission: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res
          .status(400)
          .json({ data: null, error: "Submission ID is missing" });
      }
      const { testId, userId, selections, endedAt } = req.body;
      if (!testId || !userId || !selections || !endedAt) {
        return res
          .status(400)
          .json({ data: null, error: "Required fields are missing" });
      }
      const submission = await Submission.findByIdAndUpdate(
        id,
        { testId, userId, selections, endedAt },
        {
          new: true,
        }
      );
      return res.status(200).json({ data: submission, error: null });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  },
  // Delete a submission
  deleteSubmission: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res
          .status(400)
          .json({ data: null, error: "Submission ID is missing" });
      }
      await Submission.findByIdAndUpdate(id, { isDeleted: true });
      return res.status(204).json();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  },
};

// Export the submission controller
export default submissionController;
