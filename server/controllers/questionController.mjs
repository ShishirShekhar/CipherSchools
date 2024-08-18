// Import question model
import Question from "../models/Question.mjs";

// Define the question controller object
const questionController = {
  // Get all questions
  getAllQuestions: async (req, res) => {
    try {
      const questions = await Question.find({ isDeleted: false });
      return res.status(200).json({ questions });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  // Create a question
  createQuestion: async (req, res) => {
    try {
      const question = await Question.create(req.body);
      return res.status(201).json({ question });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  // Get a question
  getQuestion: async (req, res) => {
    try {
      const question = await Question.findById(req.params.id);
      return res.status(200).json({ question });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  // Update a question
  updateQuestion: async (req, res) => {
    try {
      const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(200).json({ question });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  // Delete a question
  deleteQuestion: async (req, res) => {
    try {
      await Question.findByIdAndUpdate(req.params.id, { isDeleted: true });
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

// Export the question controller
export default questionController;
