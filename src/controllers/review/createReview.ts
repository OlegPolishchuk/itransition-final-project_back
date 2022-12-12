import {Request, Response} from "express";
import {Reviews} from "../../models/Review";

export const createReview = async (req: Request, res: Response) => {

  try{
    const {userid, review} = req.body;

    await Reviews.updateOne({userid}, {$set: {...review}})

    res.sendStatus(201);
  }
  catch (e) {
    res.status(500).json({
      message: 'error at createReview Controller', e
    })
  }

}