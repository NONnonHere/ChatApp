import express from 'express';
import { signup,login, checkAuth, updateProfile } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/check', checkAuth);
userRouter.put('/update-profile', updateProfile);

export default userRouter;