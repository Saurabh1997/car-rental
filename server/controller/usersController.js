const User = require("../Models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseUtils");

const JWT_SECRET = process.env.JWT_SECRET;

const signupUser = async (req, res) => {
  try {
    const { name, email, password, userId } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
      return sendErrorResponse(res, "Email already registered", 400);

    const existingUserId = await User.findOne({ userId });
    if (existingUserId)
      return sendErrorResponse(res, "User ID already registered", 400);

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, userId });

    sendSuccessResponse(res, "User created successfully", 201);
  } catch (error) {
    console.log(" err", error);
    return sendErrorResponse(res, "Error while registering user", 400);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return sendErrorResponse(res, "Invalid credentials", 400);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendErrorResponse(res, "Invalid credentials", 400);

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    sendSuccessResponse(res, { token, userId: user.userId }, 200);
  } catch (error) {
    return sendErrorResponse(res, "Error while logging", 400);
  }
};

module.exports = { loginUser, signupUser };
