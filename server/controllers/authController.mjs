// Import required modules
import bcrypt from "bcryptjs";
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
        return res
          .status(400)
          .json({ data: null, error: "Required fields are missing" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      const accessToken = jwt.sign(
        { _id: user._id, name: user.name, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      return res.status(201).json({
        data: { _id: user._id, name: user.name, email: user.email },
        error: null,
      });
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ data: null, error: "Email already exists" });
      }
      console.error(error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  },
  // User login
  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ data: null, error: "Required fields are missing" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ data: null, error: "User not found" });
      }

      const validPassword = await bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res
          .status(401)
          .json({ data: null, error: "Invalid Credentials" });
      }

      const accessToken = jwt.sign(
        { _id: user._id, name: user.name, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      return res.status(200).json({
        data: { _id: user._id, name: user.name, email: user.email },
        error: null,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  },
  // User logout
  userLogout: async (req, res) => {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      
      return res.status(204).json();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  },
};

// Export the auth controller
export default authController;
