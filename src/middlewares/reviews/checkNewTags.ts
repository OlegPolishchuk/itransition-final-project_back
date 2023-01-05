import {NextFunction, Request, Response} from "express";
import {addNewTags, findAllTags, isNewTags} from "../../shared";

export const checkNewTags = async (req: Request, res: Response, next: NextFunction) => {

  try {
    let {tags} = req.body;

    if (!tags) {
      const {review} = req.body;

      tags = review.tags;
    }

    const allTags = await findAllTags();

    if (isNewTags(tags, allTags)) {
      await addNewTags(tags, allTags)

      req.body.tags = tags;
    } else {
      req.body.tags = tags;
      req.body.allTags = allTags;
    }

    next();
  } catch (e) {
    res.status(500).json({
      message: 'Error in checkNewTags middleware'
    })
  }

}