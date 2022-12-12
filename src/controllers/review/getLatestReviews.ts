import {Request, Response} from "express";
import {Reviews} from "../../models/Review";

export const getLatestReviews = async (req: Request, res: Response) => {
  try{
    const reviews = await Reviews.aggregate().sort({created: 1})

    res.status(200).json(reviews)
  }
  catch (e) {
    res.status(500).json({
      message: 'Error at getLatestReview Controller'
    })
  }
}