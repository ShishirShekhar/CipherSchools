// Import question model
import Question from "../models/Question.mjs";

// Define the question controller object
const questionController = {
  // Get all questions
  getAllQuestions: async (req, res) => {
    try {
      const questions = await Question.find({ isDeleted: false });
      return res.status(200).json({ data: questions, error: null });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  },
  // Create a question
  createQuestion: async (req, res) => {
    try {
      const { question, options, correctOption, marks, testId } = req.body;
      if (!question || !options || !correctOption || !marks || !testId) {
        return res
          .status(400)
          .json({ data: null, error: "Required fields are missing" });
      }

      const newQuestion = await Question.create({
        question,
        options,
        correctOption,
        marks,
        testId,
      });
      return res.status(201).json({ data: newQuestion, error: null });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  },
  // Get a question
  getQuestion: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res
          .status(400)
          .json({ data: null, error: "Question ID is missing" });
      }
      const question = await Question.findById(id);
      return res.status(200).json({ data: question, error: null });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  },
  // Update a question
  updateQuestion: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res
          .status(400)
          .json({ data: null, error: "Question ID is missing" });
      }
      const { question, options, correctOption, marks, testId } = req.body;
      if (!question || !options || !correctOption || !marks || !testId) {
        return res
          .status(400)
          .json({ data: null, error: "Required fields are missing" });
      }

      const newQuestion = await Question.findByIdAndUpdate(
        id,
        { question, options, correctOption, marks, testId },
        {
          new: true,
        }
      );
      return res.status(200).json({ data: newQuestion, error: null });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  },
  // Delete a question
  deleteQuestion: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res
          .status(400)
          .json({ data: null, error: "Question ID is missing" });
      }
      await Question.findByIdAndUpdate(id, { isDeleted: true });
      return res.status(204).json();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  },
};

// Export the question controller
export default questionController;
