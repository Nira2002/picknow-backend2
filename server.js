import express from "express";
import dotenv from "dotenv";
import connectdb from "./database/db.js";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/ProductRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";

// Load environment variables from a .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // Set a default port if PORT is not defined

// Middleware to parse JSON requests
app.use(express.json());

// Using routes
app.use("/api/", userRoutes);
app.use("/api/", productRoutes);
app.use("/api/", adminRoutes);
app.use("/api/", vendorRoutes);
// Start the server and connect to the database
app.listen(port, async () => {
    try {
        await connectdb();  // Connect to the database
        console.log(`Server is running on http://localhost:${port}`);
    } catch (error) {
        console.error("Failed to connect to the database", error);
    }
});
