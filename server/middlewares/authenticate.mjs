// Import required modules
import jwt from "jsonwebtoken";

// Middleware to authenticate users
const authenticate = (req, res, next) => {
  try {
    const accessToken =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({ data: null, error: "Access Denied" });
    }

    const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ data: null, error: "Invalid or Expired Token" });
  }
};

export default authenticate;
