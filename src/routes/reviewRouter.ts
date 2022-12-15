import {Router} from "express";
import {
  createReview,
  deleteReviews,
  generateRandomReviews,
  getLatestReviews,
  getReviews
} from "../controllers";
import {routes} from "../shared";
import {checkNewTags} from "../middlewares";

export const reviewRouter = Router();


reviewRouter.post('/', createReview);

reviewRouter.delete('/', deleteReviews);
reviewRouter.post(routes.review.random, checkNewTags, generateRandomReviews);
reviewRouter.get(routes.review.userReviews, getReviews);
reviewRouter.get(routes.review.latest, getLatestReviews);

