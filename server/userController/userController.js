import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const generateToken = (userId) => {
  const payload = { userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
  return token;
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, image } = req.body;

    if (!name || !email || !password || password.length < 8) {
      return res.json({ success: false, message: "all fields are required" })
    }
    const userExits = await User.findOne({ email })
    if (userExits) {
      return res.json({ success: false, message: "user already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashedPassword, role, image })

    const token = generateToken(user._id.toString())
    res.json({ success: true, message: "user created successfully", token })

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}

// login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: "user not found" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.json({ success: false, message: "invalid password" })
    }
    const token = generateToken(user._id.toString())
    res.json({ success: true, message: "user logged in successfully", token })
  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}
// jwt token//

export const getUserData = async (req, res) => {
  try {
    const { user } = req;
    res.json({ success: true, user })
  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}