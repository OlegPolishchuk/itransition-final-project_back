import {Request, Response} from "express";
import {findAllTags} from "../../shared";

export const getAllTags = async (req: Request, res: Response) => {
  try{
    const tags = await findAllTags();

    res.status(200).json(tags);
  }
  catch (e) {
    res.status(500).json({
      message: 'Error at getAllTags Controller',e
    })
  }
}