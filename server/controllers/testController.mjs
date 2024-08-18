// Import test model
import Test from "../models/Test.mjs";

// Define the test controller object
const testController = {
  // Get all tests
  getAllTests: async (req, res) => {
    try {
      const tests = await Test.find({ isDeleted: false }).populate("questions");
      return res.status(200).json({ tests });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
  // Create a test
  createTest: async (req, res) => {
    try {
      const test = await Test.create(req.body);
      return res.status(201).json({ test });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  // Get a test
  getTest: async (req, res) => {
    try {
      const test = await Test.findById(req.params.id).populate("questions");
      return res.status(200).json({ test });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  // Update a test
  updateTest: async (req, res) => {
    try {
      const test = await Test.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(200).json({ test });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  // Delete a test
  deleteTest: async (req, res) => {
    try {
      await Test.findByIdAndUpdate(req.params.id, { isDeleted: true });
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

// Export the test controller
export default testController;
