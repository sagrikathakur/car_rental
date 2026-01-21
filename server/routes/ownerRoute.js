import express from "express";
import { changeRoleToOwner, getOwnerProfile, updateOwnerProfile, addCar, listCars } from "../userController/ownerController.js";
import protect from "../middleware/auth.js";

const ownerRouter = express.Router();

// Change role to owner (user must be logged in)
ownerRouter.post("/change-role", protect, changeRoleToOwner);

// Get owner profile (protected)
ownerRouter.get("/profile", protect, getOwnerProfile);

// Update owner profile (protected)
ownerRouter.put("/profile", protect, updateOwnerProfile);

// Add a new car (protected)
ownerRouter.post("/add-car", protect, addCar);

// List all cars owned by the owner (protected)
ownerRouter.get("/list-cars", protect, listCars);

export default ownerRouter;

