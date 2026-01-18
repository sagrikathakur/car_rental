import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protect = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.json({ success: false, message: "unauthorized" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) {
      return res.json({ success: false, message: "unauthorized" })
    }

    req.user = await User.findById(decoded.userId).select('-password')
    next()
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}

export default protect;
