import {Request, Response} from "express";
import {Reviews} from "../../models/Review";

export const deleteReviews = async (req: Request, res: Response) => {
  try{
    const reviewsId = req.query.id as string | string[];

    console.log(reviewsId)

   if (Array.isArray(reviewsId)) {
     for await (let id of reviewsId) {
       await Reviews.deleteOne({_id: id})
     }
   }
   else  {
     await Reviews.deleteOne({_id: reviewsId})
   }

    res.sendStatus(200);
  }
  catch (e) {
    res.status(500).json({
      message: 'Error in deleteReviews Controller'
    })
  }
}