import {Request, Response} from "express";
import {Reviews} from "../../models/Review";
import {User} from "../../models";

export const createReview = async (req: Request, res: Response) => {

  try{
    const {review} = req.body;
    const userId = review.userId;
    let userName = review.userName;
    let userLikes ;

    if (!userName || !userLikes) {
      const user = await User.findById(userId);

      userName = user!.login;
      userLikes = user!.likes;
    }

    const newReview = new Reviews ({
      ...review,
      userName,
      likes: 0,
      userLikes: userLikes,
      likesId: [],
      created: Date.now(),
      updated: Date.now()
    })

    await newReview.save();

    res.sendStatus(201)
  }
  catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'error at createReview Controller', e
    })
  }

}