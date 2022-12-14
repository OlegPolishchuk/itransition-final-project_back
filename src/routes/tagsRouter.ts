import {Router} from "express";
import {deleteTags, getAllTags, updateTags} from "../controllers";

export const tagsRouter = Router();

tagsRouter.get('/', getAllTags);
tagsRouter.put('/', updateTags);
tagsRouter.delete('/', deleteTags);