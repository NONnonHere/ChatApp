import User from "../models/User.js";
import Message from "../models/Messages.js";
import cloudinary from "../lib/cloudinary.js";
import { io, userSockMap } from "../server.js";


export const getUsersForSidebar = async (req, res) => {
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password");

        const unSeenMessages = {}

        const promises = filteredUsers.map(async (user) => {
            const messages = await Message.find({senderId: user._id, receiverId: userId, seen:false})
            if(messages.length > 0){
                unSeenMessages[user._id] = messages.length;
            }
        });
        await Promise.all(promises);
        res.json({
            status: "success",
            message: "Users fetched successfully",
            users: filteredUsers,
            unSeenMessages
        });
    } catch (error) {
        console.error("Error fetching users for sidebar:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const getMessage = async (req, res) => {
    try {
        const {id:selectedUserId}   = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: selectedUserId },
                { senderId: selectedUserId, receiverId: myId }
            ]

        })
        await Message.updateMany(
            { senderId: selectedUserId, receiverId: myId, seen: false },
            { $set: { seen: true } }
        );

        res.json({
            status: "success",
            message: "Messages fetched successfully",
            messages
        });
    } catch (error) {
        console.error("Error getting messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}


export const markMessageAsSeen = async (req, res) => {
    try {
        const {id} = req.params;
        await Message.findByIdAndUpdate(id, { seen: true });
        res.json({
            status: "success",
            message: "Message marked as seen successfully"
        });
    } catch (error) {
        console.error("Error marking message as seen:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const receiverId = req.params.id;
        const senderId =  req.user._id;

        let imageUrl = "";
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });


        await newMessage.save();

        const receiverSocketId = userSockMap[receiverId];
        if (receiverSocketId) {
            
            io.to(receiverSocketId).emit("getMessage", newMessage);
        }

        res.json({
            status: "success",
            message: "Message sent successfully",
            data: newMessage
        });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};