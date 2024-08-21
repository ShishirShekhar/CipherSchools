// Import test model
import Test from "../models/Test.mjs";

// Define the test controller object
const testController = {
  // Get all tests
  getAllTests: async (req, res) => {
    try {
      const tests = await Test.find({ isDeleted: false }).populate("questions");
      return res.status(200).json({ data: tests, error: null });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  },
  // Create a test
  createTest: async (req, res) => {
    try {
      const { title, description } = req.body;
      if (!title || !description) {
        return res
          .status(400)
          .json({ data: null, error: "Required fields are missing" });
      }
      const test = await Test.create({ title, description });
      return res.status(201).json({ data: test, error: null });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  },
  // Get a test
  getTest: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res
          .status(400)
          .json({ data: null, error: "Test ID is missing" });
      }
      const test = await Test.findById(id).populate("questions");
      if (!test) {
        return res.status(404).json({ data: null, error: "Test not found" });
      }

      return res.status(200).json({ data: test, error: null });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  },
  // Update a test
  updateTest: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res
          .status(400)
          .json({ data: null, error: "Test ID is missing" });
      }
      const { title, description } = req.body;
      if (!title || !description) {
        return res
          .status(400)
          .json({ data: null, error: "Required fields are missing" });
      }
      const test = await Test.findByIdAndUpdate(
        id,
        { title, description },
        {
          new: true,
        }
      );
      return res.status(200).json({ data: test, error: null });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  },
  // Delete a test
  deleteTest: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res
          .status(400)
          .json({ data: null, error: "Test ID is missing" });
      }
      await Test.findByIdAndUpdate(id, { isDeleted: true });
      return res.status(204).json();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  },
};

// Export the test controller
export default testController;
