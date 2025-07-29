//SignUp new user 
import { generateToken } from "../lib/utils";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body;
     
    try {
        // Check if user already exists
        if( !fullName || !email || !password ) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            bio,
        }); 

        const token = generateToken(newUser._id);

        res.json({
            status: "success",
            message: "User created successfully",
            userData: newUser, 
            token 
        }); 
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ message: "Internal server error" });
    }   
}



export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        const isPasswordValid = user && (await bcrypt.compare(password, user.password));
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user._id);
        res.json({
            status: "success",  
            message: "Login successful",
            userData: user,
            token
        });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
} 


export const checkAuth = async (req, res) => {
    res.json({
        status: "success",
        message: "User is authenticated",
        userData: req.user
    });
}

export const updateProfile = async (req, res) => {
    const { fullName, email, password, bio } = req.body;
    const userId = req.user._id;

    try {
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let updatedUser;

        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId, {bio, fullName, email}, { new: true });
        } else {
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(userId, {profilePic: upload.secure_url, bio, fullName, email}, { new: true });
        }   
        res.json({
            status: "success",
            message: "Profile updated successfully",
            userData: updatedUser
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}