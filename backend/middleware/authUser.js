const jwt = require("jsonwebtoken");
const userModel = require("../models/User.js");

const authUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        console.log("Received Token:", token);

        if (!token) {
            return res.status(401).json({ success: false, message: "No token found" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);  

        const user = await userModel.findById(decoded.userId);  // Use `userId` directly
        console.log("Fetched User from DB:", user);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found in DB" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(401).json({ success: false, message: "Invalid token", error: error.message });
    }
};

module.exports = authUser;
