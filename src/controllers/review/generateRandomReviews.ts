import {Request, Response} from "express";
import {Groups} from "../../models/Groups";
import {createRandomReview} from "../../shared";
import {Review, Reviews} from "../../models/Review";


export const generateRandomReviews = async (req: Request, res: Response) => {
  try{
    const {userId, count, locale} = req.body;

    const groups = await Groups.find();
    const tags = groups[0].groups;

    const reviews: Partial<Review>[] = createRandomReview(count,locale,userId, tags)

    await Reviews.insertMany(reviews);

    res.sendStatus(201);
  }
  catch (e) {
    res.status(500).json({
      message: 'Error at generateRansomReviews Controller'
    })
  }
}