import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id).select("-password");
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

