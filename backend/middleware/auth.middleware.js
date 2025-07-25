import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

const  protect = asyncHandler(async (req, res, next) => {
    let token;

    token= req.cookies.jwt;

    if (token) {
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Find the user by ID and exclude the password field
            req.user = await User.findById(decoded.userId).select('-password');

            next();
        }catch(error) {
            res.status(401);
            throw new Error("Not authorized, invalid token");
        }
    }else{
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

export { protect };