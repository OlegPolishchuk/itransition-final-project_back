import {Router} from "express";
import {getCurrentUser, updateUser, updateUserAvatar} from "../controllers";
import {MulterFileHandler} from "../middlewares";

export const userRouter = Router();

userRouter.get('/', getCurrentUser);
userRouter.put('/', updateUser);
userRouter.post('/',MulterFileHandler.getInstance().single('file'), updateUserAvatar);
