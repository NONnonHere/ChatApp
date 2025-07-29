import express from "express";
import {protectRoute} from "../middleware/auth.js";
import { getUsersForSidebar, getMessage, markMessageAsSeen, sendMessage } from "../controllers/messageController.js";



const messagesRouter = express.Router();

messagesRouter.get("/sidebar", protectRoute, getUsersForSidebar);
messagesRouter.get("/:id", protectRoute, getMessage);
messagesRouter.put("mark/:id", protectRoute, markMessageAsSeen);
messagesRouter.post("/send/:id", protectRoute, sendMessage);

export default messagesRouter;