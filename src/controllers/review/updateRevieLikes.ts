import {Request, Response} from "express";
import {Reviews} from "../../models";

export const updateReviewLikes = async (req: Request, res: Response) => {

  try {
    const {reviewId, userId} = req.body;

    await Reviews.updateOne({_id: reviewId}, {$inc: {likes: 1}, $push: {likesId: userId}})

    const review = await Reviews.findById(reviewId);

    res.status(201).json({review})
  }
  catch (e) {
    res.status(500).json({
      message: 'Error in updateReview controller'
    })
  }

}