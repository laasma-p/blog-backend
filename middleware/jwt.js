const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Access denied." });
    }

    req.userId = user.userId;
    req.role = user.role;
    next();
  });
};

module.exports = authenticateToken;
