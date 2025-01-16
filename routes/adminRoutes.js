import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

// Route for admin registration
router.post("/admin/register", registerAdmin);

// Route for admin login
router.post("/admin/login", loginAdmin);

export default router; 