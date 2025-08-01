// server/routes/userRoutes.js

import express from 'express';
import { signup, login, checkAuth, updateProfile } from '../controllers/userController.js';
import { protectRoute } from '../middleware/auth.js';
import upload from '../middleware/multer.js'; 

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/check', protectRoute, checkAuth);
userRouter.put('/update-profile', protectRoute, upload.single('profilePic'), updateProfile);

export default userRouter;