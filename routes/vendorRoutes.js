import express from "express";
import { isAuth } from "../middelware/isAuth.js"; // Ensure the user is authenticated
import { addVendor, getVendors, getVendorById, updateVendor, deleteVendor } from "../controllers/vendorController.js"; // Import vendor controller functions

const router = express.Router();

// Route for adding a vendor (only accessible by admins)
router.post("/vendor/new", isAuth, addVendor);

// Route for getting all vendors
router.get("/vendors", isAuth, getVendors);

// Route for getting a single vendor by ID
router.get("/vendor/:id", isAuth, getVendorById);

// Route for updating a vendor
router.put("/vendor/:id", isAuth, updateVendor);

// Route for deleting a vendor
router.delete("/vendor/:id", isAuth, deleteVendor);

export default router; 