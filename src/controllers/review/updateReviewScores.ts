import {Request, Response} from "express";
import {Reviews} from "../../models";

export const updateReviewScores = async (req: Request, res: Response) => {

  try {
    const {reviewId, userId, score} = req.body;

    const review = await Reviews.findById(reviewId);

    if (review) {
      const overallScore = review.overallScore;
      const scoreCount = review.overallScoresId.length;

      const updatedScore = ((overallScore + score) / (scoreCount + 1)).toFixed(1);

      await Reviews.updateOne(
        {_id: reviewId},
        {$set: {overallScore: updatedScore}, $push: {overallScoresId: userId}})


      const updatesReview = await Reviews.findById(reviewId);

      res.status(201).json({review: updatesReview})
    }

  }
  catch (e) {
    res.status(500).json({
      message: 'Error in updateReview controller'
    })
  }

}