import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log("Database connected successfully"))
    mongoose.connection.on('error', (err) => console.log("Database connection error:", err))

    await mongoose.connect(`${process.env.MONGODB_URI}/carRent_app`)
  } catch (error) {
    console.log("Database connection failed:", error.message)
  }
}

export default connectDB;