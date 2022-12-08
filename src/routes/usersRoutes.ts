import {Router} from "express";
import {deleteUsers, getUsers, updateUsers} from "../controllers";
import {generateRandomUsers} from "../controllers";

export const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.put('/', updateUsers);
usersRouter.delete('/', deleteUsers);
usersRouter.post('/', generateRandomUsers);