import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  fuelType: { type: String, required: true },
  transmission: { type: String, required: true },
  seats: { type: Number, required: true },
  description: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true })

const Car = mongoose.model('Car', carSchema)

export default Car
