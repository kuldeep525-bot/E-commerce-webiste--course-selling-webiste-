import jwt from "jsonwebtoken";
import { JWT_ADMIN_PASSWORD } from "../config.js";

// Function for middleware
function adminmiddleware(req, res, next) {
  // Firstly, we check the auth header
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  // Now extract the token from the authorization header
  const token = authHeader.split(" ")[1];

  // Now we write code for token validation
  try {
    // jwt.verify is a default jwt query
    // We verify with the token and the secret key
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    console.log("Invalid token or Expired token", error);
    return res.status(401).json({ error: "Invalid token or Expired token" });
  }
}

export default adminmiddleware;
