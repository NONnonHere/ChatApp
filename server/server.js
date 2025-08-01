import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messagesRouter from "./routes/messagesRoutes.js";
import {Server} from "socket.io";

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors:{origin: "*"}
});

export const userSockMap = {};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User connected:", userId);
    if(userId) {
        userSockMap[userId] = socket.id;
    }
    io.emit("getOnlineUsers", Object.keys(userSockMap));

    socket.on("disconnect", () => {
        console.log("User disconnected:", userId);
        delete userSockMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSockMap));
    });
});

app.use(express.json({limit: "4mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/status", (req, res) => {
  res.status(200).json({ status: "Server is running" });
});

app.use("/api/auth", userRouter);
app.use("/api/messages", messagesRouter);


// Connect to MongoDB
await connectDB();

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log("server is started"));