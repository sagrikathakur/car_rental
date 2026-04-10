import * as User from "../models/user.js";
import * as Car from "../models/car.js";

// Change user role to owner
export const changeRoleToOwner = async (req, res) => {
  try {
    const { id } = req.user; 

    const user = await User.updateRole(id, "owner");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Role changed to owner successfully", user });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get owner profile
export const getOwnerProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user || user.role !== "owner") {
      return res.json({ success: false, message: "Owner not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Update owner profile
export const updateOwnerProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, image } = req.body;

    const user = await User.updateProfile(id, { name, image });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Add a new car
export const addCar = async (req, res) => {
  try {
    const { id } = req.user;
    const { brand, model, year, color, price, image, category, fuelType, transmission, seats, description, pricePerDay } = req.body;

    // Validate required fields
    if (!brand || !model || !year || !price || !image || !category || !fuelType || !transmission || !seats || !description || !pricePerDay) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const car = await Car.create({
      owner_id: id,
      brand,
      model,
      year,
      color,
      price,
      image,
      category,
      fuel_type: fuelType,
      transmission,
      seats,
      description,
      price_per_day: pricePerDay
    });

    res.json({ success: true, message: "Car added successfully", car });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// List all cars owned by the owner
export const listCars = async (req, res) => {
  try {
    const { id } = req.user;

    const cars = await Car.findByOwner(id);

    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
