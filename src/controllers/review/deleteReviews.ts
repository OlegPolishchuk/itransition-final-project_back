import {Request, Response} from "express";
import {updateReviewsCount} from "../../shared";
import {User, Reviews} from "../../models";

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
       const review = await Reviews.findById(id);
       const reviewLikes = review!.likes;

       if (reviewLikes > 0) {
         await User.updateOne({_id: userId}, {$inc: {likes: -reviewLikes}});
         await Reviews.updateMany({userId}, {$inc: {userLikes: -reviewLikes}});
       }

       await Reviews.deleteOne({_id: id});
     }
   }
   else  {
     const review = await Reviews.findOne({_id: reviewsId})
     const reviewLikes = review!.likes;
     userId = review?.userId;

     count = 1;

     if (reviewLikes > 0) {
       await User.updateOne({_id: userId}, {$inc: {likes: -reviewLikes}});
       await Reviews.updateMany({userId}, {$inc: {userLikes: -reviewLikes}});
     }

     await Reviews.deleteOne({_id: reviewsId})
   }


    await updateReviewsCount([userId as string], -count)

    res.sendStatus(200);
  }
  catch (e) {
    res.status(500).json({
      message: 'Error in deleteReviews Controller', e
    })
  }
}