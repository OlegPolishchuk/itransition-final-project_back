import {Request, Response} from "express";
import {createRandomReview, updateReviewsCount} from "../../shared";
import {Reviews} from "../../models";
import {Review} from "../../types";


export const generateRandomReviews = async (req: Request, res: Response) => {
  try{
    const {userId, reviewsCount, locale, group, tags, allTags} = req.body;

    const checkedTags = tags.length ? tags : allTags;
    const reviews: Partial<Review>[] = await createRandomReview(reviewsCount,locale,userId, checkedTags, group)


    await Reviews.insertMany(reviews);

    await updateReviewsCount([userId], +reviewsCount)

    res.sendStatus(201);
  }
  catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Error at generateRandomReviews Controller', e
    })
  }
}