import express from "express";
import {protectRoute} from "../middlewares/authMiddleware.js";
import { getUsersForSidebar, getMessage, markMessageAsSeen } from "../controllers/messageController.js";



const messagesRouter = express.Router();

messagesRouter.get("/sidebar", protectRoute, getUsersForSidebar);
messagesRouter.get("/:id", protectRoute, getMessage);
messagesRouter.get("mark/:id", protectRoute, markMessageAsSeen);

export default messagesRouter;