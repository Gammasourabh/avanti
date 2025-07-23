const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const authMiddleware = (req, res, next) => {
  // Get token from cookie or Authorization header
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check for admin role
    if (decoded.role !== "admin") {
      return res.status(403).json({ msg: "Forbidden: Admins only" });
    }

    req.user = decoded; // Save user info to request
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = authMiddleware;
