const jwt = require("jsonwebtoken");
const { sendErrorResponse } = require("../utils/responseUtils");
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return sendErrorResponse(res, "Unauthorized", 401);

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    return sendErrorResponse(res, "Invalid token", 403);
  }
};

module.exports = { authMiddleware };
