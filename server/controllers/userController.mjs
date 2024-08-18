// Import the User model
import User from "../models/User.mjs";

// Define the user controller object
const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({ isDeleted: false });
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  // Get a user
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

// Export the user controller
export default userController;
