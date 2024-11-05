import express from 'express';
import * as userController from '../controllers/userController';
import protect from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/register', userController.registerUser);
userRouter.get('/', userController.fetchAllUsers)
userRouter.post('/check', userController.checkUser);
userRouter.post('/login', userController.login);
userRouter.get('/logout', userController.logout);
userRouter.patch('/updateMe', protect, userController.updateMe);

export default userRouter;
