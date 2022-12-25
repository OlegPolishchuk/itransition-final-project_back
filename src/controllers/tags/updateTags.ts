import {Request, Response} from "express";
import {Tags} from "../../models";

export const updateTags = async (req: Request, res: Response) => {
  try{
    const {newTag} = req.body;

    await Tags.updateMany({}, {$push: {groups: newTag}});

    res.sendStatus(204);
  }
  catch (e) {
    res.status(500).json({
      message: 'Error at updateTags Controller'
    })
  }
}