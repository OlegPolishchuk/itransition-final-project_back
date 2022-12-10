import {Router} from "express";
import {getCurrentUser, updateUser} from "../controllers";

export const userRouter = Router();

userRouter.get('/', getCurrentUser);

userRouter.put('/', updateUser);