// Import required modules
import jwt from "jsonwebtoken";

// Middleware to authenticate users
const authenticate = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Access Denied: No token provided" });
    }
    
    const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified; // Attach the decoded token payload to the request object

    next(); // Pass control to the next middleware/route handler
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid or Expired Token" });
  }
};

export default authenticate;
