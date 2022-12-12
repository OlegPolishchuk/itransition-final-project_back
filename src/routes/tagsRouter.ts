import {Router} from "express";
import {getAllTags, updateTags} from "../controllers";

export const tagsRouter = Router();

tagsRouter.get('/', getAllTags);
tagsRouter.put('/', updateTags);