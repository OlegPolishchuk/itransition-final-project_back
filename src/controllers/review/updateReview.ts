import {Request, Response} from "express";
import {Reviews} from "../../models";
import {Review} from "../../types";

export const updateReview = async (req: Request, res: Response) => {

  try {
    const review: Review & {_id: string} = req.body;

    await Reviews.updateOne({_id: review._id}, {$set: {...review}});

    res.sendStatus(201);
  }
  catch (e) {
    res.status(500).json({
      message: 'Error in updateReview controller', e
    })
  }

}