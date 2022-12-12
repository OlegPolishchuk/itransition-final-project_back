import {Request, Response} from "express";
import {Groups} from "../../models/Groups";

export const updateTags = async (req: Request, res: Response) => {
  try{
    const {newTag} = req.body;

    console.log(newTag)

    await Groups.updateMany({}, {$push: {groups: newTag}});

    res.sendStatus(204);
  }
  catch (e) {
    res.status(500).json({
      message: 'Error at updateTags Controller'
    })
  }
}