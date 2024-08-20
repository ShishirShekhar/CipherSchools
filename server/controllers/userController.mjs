import jwt from "jsonwebtoken";
// Import the User model
import User from "../models/User.mjs";

// Define the user controller object
const userController = {
  // Get a user
  getUser: async (req, res) => {
    try {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      // Get the user ID from the access token
      const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(data.id);
      return res
        .status(200)
        .json({ _id: user._id, name: user.name, email: user.email });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

// Export the user controller
export default userController;
