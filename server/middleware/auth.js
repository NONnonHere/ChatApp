// server/middleware/auth.js

import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) return res.status(401).json({ success: false, message: "No token, authorization denied" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) return res.json({ success: false, message: "User not found" });

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        return res.status(401).json({ success: false, message: "Token is not valid" });
    }
};

// FIX: Return the full user object to be consistent
export const checkAuth = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    res.status(200).json({
        success: true,
        user: req.user, // Send the full user object
    });
};