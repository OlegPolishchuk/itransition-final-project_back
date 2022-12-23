import {Request, Response} from "express";
import {Reviews} from "../../models/Review";

export const createReview = async (req: Request, res: Response) => {

  try{
    const {review} = req.body;
    const userId = review.userId;

    const newReview = new Reviews ({
      ...review,
      likes: 1,
      likesId: [userId],
      created: Date.now(),
      updated: Date.now()
    })

    await newReview.save();

    res.sendStatus(201)
  }
  catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'error at createReview Controller', e
    })
  }

}