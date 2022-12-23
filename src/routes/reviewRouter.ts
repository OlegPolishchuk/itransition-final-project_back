import {Router} from "express";
import {
  createReview,
  deleteReviews,
  generateRandomReviews,
  getReviews,
  getCurrentUserReviews
} from "../controllers";
import {routes} from "../shared";
import {checkNewTags} from "../middlewares";

export const reviewRouter = Router();

reviewRouter.get('/', getReviews);
reviewRouter.post(routes.review.new, createReview);

reviewRouter.delete('/', deleteReviews);
reviewRouter.post(routes.review.random, checkNewTags, generateRandomReviews);
reviewRouter.get(routes.review.userReviews, getCurrentUserReviews);


