import {NextFunction, Request, Response} from "express";
import {addNewTags, findAllTags} from "../../shared";

export const checkNewTags = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const {data} = req.body;
    const {tags} = data;
    const allTags = await findAllTags();

    tags.forEach((tag: string) => {
      if (allTags.indexOf(tag) === -1) {
        return addNewTags(tags, allTags)
      }
    })

    next();
  }
  catch (e) {
    res.status(500).json({
      message: 'Error in checkNewTags middleware'
    })
  }

}