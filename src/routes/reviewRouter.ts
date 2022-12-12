import {Router} from "express";
import {
  createReview,
  generateRandomReviews,
  getLatestReviews,
  getReviews
} from "../controllers";
import {routes} from "../shared";

export const reviewRouter = Router();

reviewRouter.get('/', () => {});
reviewRouter.post('/', createReview);
reviewRouter.put('/', () => {});
reviewRouter.delete('/', () => {});
reviewRouter.post(routes.review.random, generateRandomReviews);

reviewRouter.get(routes.review.userReviews, getReviews);
reviewRouter.post(routes.review.latest, getLatestReviews);

