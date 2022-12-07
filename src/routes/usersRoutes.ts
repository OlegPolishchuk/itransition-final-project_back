import {Router} from "express";
import {deleteUsers, getUsers, updateUsers} from "../controllers";

export const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.put('/', updateUsers);
usersRouter.delete('/', deleteUsers);