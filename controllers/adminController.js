import { Admin } from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Admin Registration
export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if admin already exists
        let existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin Email Already Exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const admin = new Admin({ name, email, password: hashedPassword });
        await admin.save();

        res.status(201).json({
            message: "Admin created successfully",
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Admin Login
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check admin email address
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Check password
        const matchPassword = await bcrypt.compare(password, admin.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Generate signed token
        const token = jwt.sign({ _id: admin.id }, process.env.JWT_SECRET, { expiresIn: "15d" });

        return res.status(200).json({ message: `Welcome ${admin.name}`, token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}; 