//SignUp new user 
import { generateToken } from "../lib/utils.js";
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

        console.log("Attempting to save new user...");
        await newUser.save();
        console.log("New user saved successfully!"); 

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
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
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
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
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
    try {
        const { fullName, bio } = req.body;
        const userId = req.user._id;

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

      
        if (req.file) {
            
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            
            
            const uploadResponse = await cloudinary.uploader.upload(dataURI);
            user.profilePic = uploadResponse.secure_url;
        }

        user.fullName = fullName || user.fullName;
        user.bio = bio || user.bio;

        await user.save();

        res.json({
            status: "success",
            message: "Profile updated successfully",
            userData: user
        });

    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};