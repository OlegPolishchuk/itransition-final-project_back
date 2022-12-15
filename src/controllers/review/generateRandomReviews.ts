import {Request, Response} from "express";
import {createRandomReview, updateReviewsCount} from "../../shared";
import {Review, Reviews} from "../../models/Review";


export const generateRandomReviews = async (req: Request, res: Response) => {
  try{
    const {userId, reviewsCount, locale, tags, allTags} = req.body;

    const checkedTags = tags.length ? tags : allTags;

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