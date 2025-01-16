import { Vendor } from "../models/Vendor.js";

// Add new vendor
export const addVendor = async (req, res) => {
    try {
        const { name, email, contact, address } = req.body;

        // Validate required fields
        if (!name || !email || !contact || !address) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if vendor already exists
        const existingVendor = await Vendor.findOne({ email });
        if (existingVendor) {
            return res.status(400).json({ message: "Vendor with this email already exists." });
        }

        // Create new vendor
        const vendor = await Vendor.create({ name, email, contact, address });

        res.status(201).json({
            message: "Vendor added successfully.",
            vendor,
        });
    } catch (error) {
        console.error("Error:", error.message); // Log the error for debugging
        return res.status(500).json({ message: error.message });
    }
};

// Get all vendors
export const getVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).json(vendors);
    } catch (error) {
        console.error("Error:", error.message); // Log the error for debugging
        return res.status(500).json({ message: error.message });
    }
};

// Get a single vendor by ID
export const getVendorById = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found." });
        }
        res.status(200).json(vendor);
    } catch (error) {
        console.error("Error:", error.message); // Log the error for debugging
        return res.status(500).json({ message: error.message });
    }
};

// Update a vendor
export const updateVendor = async (req, res) => {
    try {
        const { name, email, contact, address } = req.body;
        const vendor = await Vendor.findByIdAndUpdate(req.params.id, { name, email, contact, address }, { new: true });

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found." });
        }

        res.status(200).json({
            message: "Vendor updated successfully.",
            vendor,
        });
    } catch (error) {
        console.error("Error:", error.message); // Log the error for debugging
        return res.status(500).json({ message: error.message });
    }
};

// Delete a vendor
export const deleteVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found." });
        }
        res.status(200).json({ message: "Vendor deleted successfully." });
    } catch (error) {
        console.error("Error:", error.message); // Log the error for debugging
        return res.status(500).json({ message: error.message });
    }
}; 