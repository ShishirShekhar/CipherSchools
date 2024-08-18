// Import required modules
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// Import the User model
import User from "../models/User.mjs";

// Define the auth controller object
const authController = {
  // User signup
  userSignup: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const hashedPassword = bcryptjs.hashSync(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      const accessToken = jwt.sign(
        { id: user._id, email: email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("accessToken", accessToken, { httpOnly: true });
      return res.status(201).json({ accessToken });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: "Email already exists" });
      }
      return res.status(500).json({ error: error.message });
    }
  },
  // User login
  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const validPassword = bcryptjs.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      const accessToken = jwt.sign(
        { id: user._id, email: email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("accessToken", accessToken, { httpOnly: true });
      return res.status(200).json({ accessToken });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  // User logout
  userLogout: async (req, res) => {
    try {
      res.clearCookie("accessToken");
      return res.status(200).json({ message: "User logged out" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

// Export the auth controller
export default authController;
