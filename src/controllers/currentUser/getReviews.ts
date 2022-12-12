import {Request, Response} from "express";
import {Reviews} from "../../models/Review";

export const getReviews = async (req: Request, res: Response) => {
  try{
    const {id} = req.query;

    const reviews = await Reviews.find({userId: id});

    res.status(200).json(reviews)
  }
  catch (e) {
    res.status(500).json({
      message: 'Error at getReview Controller'
    })
  }
}