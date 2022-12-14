import {Request, Response} from "express";
import {Groups} from "../../models/Groups";
import {createRandomReview, findAllTags, updateReviewsCount} from "../../shared";
import {Review, Reviews} from "../../models/Review";


export const generateRandomReviews = async (req: Request, res: Response) => {
  try{
    const {userId, reviewsCount, locale, tags} = req.body;

    const checkedTags = tags.length ? tags : await findAllTags();

    const reviews: Partial<Review>[] = createRandomReview(reviewsCount,locale,userId, checkedTags)

    await Reviews.insertMany(reviews);

    await updateReviewsCount([userId], +reviewsCount)

    res.sendStatus(201);
  }
  catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Error at generateRandomReviews Controller'
    })
  }
}