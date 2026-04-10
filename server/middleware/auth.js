import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

const protect = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.json({ success: false, message: "unauthorized" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded || !decoded.userId) {
      return res.json({ success: false, message: "unauthorized" })
    }

    const result = await pool.query(
      'SELECT id, name, email, role, image FROM users WHERE id = $1',
      [decoded.userId]
    );
    
    const user = result.rows[0];

    if (!user) {
      return res.json({ success: false, message: "unauthorized" });
    }

    req.user = user;
    next()
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}

export default protect;

