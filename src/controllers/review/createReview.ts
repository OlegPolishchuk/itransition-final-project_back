import {Request, Response} from "express";
import {Reviews, User} from "../../models";
import {createCommentsBase} from "../../shared";


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
      comments: 0,
      created: Date.now(),
      updated: Date.now()
    })

    await newReview.save();

    const lastReview = await Reviews.findOne({userId, $orderby: {_id: -1}});

    const reviewId = lastReview!._id;

    await createCommentsBase(reviewId.toString())

    res.sendStatus(201)
  }
  catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'error at createReview Controller', e
    })
  }

}