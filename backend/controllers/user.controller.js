import asyncHandler from "express-async-handler";
import generateToken from '../utils/generateToken.js';
import User from "../models/user.model.js";

// @desc    Auth user/set token
// @route   POST /api/users/auth
// @access  Public

const authUser = asyncHandler( async (req ,res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// @desc    Register a new user
// @route   POST /api/users/
// @access  Public

const registerUser = asyncHandler( async (req ,res) => {
    const {name , email, password} = req.body;
    
    const userExists = await User.findOne({ email });

    if(userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user) {
        generateToken(res, user._id);
         // Set the status code to 201 (Created) and return the user data
         // in the response body.
         // This is a common practice to indicate that a new resource has been created successfully.
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
    
    
    res.status(200).json({ message: "Register User"});
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public

const logoutUser = (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "User logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler( async (req ,res) => {
    const user = await User.findById(req.user._id);
     console.log(user._id);

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    Update user profile
// @route   Put /api/users/profile  
// @access  Private

const updateUserProfile = asyncHandler( async (req ,res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}