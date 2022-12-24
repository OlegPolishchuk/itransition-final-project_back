import {Request, Response} from "express";
import {Groups} from "../../models";

export const deleteTags = async (req: Request, res: Response) => {

  try {
    let idList= req.query.id as string[];

    if (!Array.isArray(idList)) {
      idList = [idList]
    }


    await Groups.updateOne({}, {$pullAll: {groups: idList}})

    res.sendStatus(204);
  }
  catch (e) {
    res.status(500).json({
      message: 'Error in deleteTags controller', e
    })
  }

}