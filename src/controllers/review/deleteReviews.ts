import {Request, Response} from "express";
import {Reviews} from "../../models/Review";
import {updateReviewsCount} from "../../shared";

export const deleteReviews = async (req: Request, res: Response) => {
  try{
    const reviewsId = req.query.id as string | string[];
    let count;
    let userId;

   if (Array.isArray(reviewsId)) {
     const review = await Reviews.findOne({_id: reviewsId[0]})
     userId = review?.userId;

     count = reviewsId.length;

     for await (let id of reviewsId) {
       await Reviews.deleteOne({_id: id})
     }
   }
   else  {
     const review = await Reviews.findOne({_id: reviewsId})
     userId = review?.userId;

     count = 1;

     await Reviews.deleteOne({_id: reviewsId})
   }

    await updateReviewsCount([userId as string], -count)

    res.sendStatus(200);
  }
  catch (e) {
    res.status(500).json({
      message: 'Error in deleteReviews Controller'
    })
  }
}