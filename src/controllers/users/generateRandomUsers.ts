import {Request, Response} from "express";
import {User} from "../../models/User";
import {createRandomReview, createRandomUser,} from "../../shared";
import {Reviews} from "../../models/Review";
import {Review, UserType} from "../../types";

export const generateRandomUsers = async (req: Request, res: Response) => {
  try {
    const {usersCount, reviewsCount, locale, status, tags, allTags} = req.body;

    const users: Partial<UserType>[] = createRandomUser(usersCount, locale, status, reviewsCount);

    await User.insertMany(users);

    if (Number(reviewsCount) !== 0) {
      const usersId = users.map(user => user._id);

      let checkedTags: string[] = [];

      if (Number(tags) === 0) {
        checkedTags =  allTags;
      }
      else {
        checkedTags = [...tags];
      }

      const reviews: Partial<Review>[] = [];


      for await (let id of usersId) {
        const usersReview = await createRandomReview(reviewsCount, locale, id as string, checkedTags);
          reviews.push(...usersReview);
      }

      await Reviews.insertMany(reviews)
    }

    res.sendStatus(201);

  } catch (e) {
    console.log(e)
    res
      .status(500)
      .json({message: 'Error at generateRandomUser Controller', e})
  }
}