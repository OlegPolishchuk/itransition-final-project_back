import {Router} from "express";
import {
  deleteUsers,
  getUsers,
  updateUsers,
  generateRandomUsers
} from "../controllers";
import {checkNewTags} from "../middlewares";

export const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.put('/', updateUsers);
usersRouter.delete('/', deleteUsers);
usersRouter.post('/', checkNewTags, generateRandomUsers);