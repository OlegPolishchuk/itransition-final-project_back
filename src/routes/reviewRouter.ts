import {Router} from "express";
import {
  createReview,
  deleteReviews,
  generateRandomReviews,
  getReviews,
  getCurrentUserReviews,
  updateReviewLikes,
  updateReviewScores,
  uploadReviewImage,
} from "../controllers";
import {routes} from "../shared";
import {checkNewTags, MulterFileHandler} from "../middlewares";

export const reviewRouter = Router();

reviewRouter.get('/', getReviews);
reviewRouter.post(routes.review.new, createReview);
reviewRouter.delete('/', deleteReviews);
reviewRouter.post(routes.review.random, checkNewTags, generateRandomReviews);
reviewRouter.get(routes.review.userReviews, getCurrentUserReviews);
reviewRouter.post(routes.review.like, updateReviewLikes);
reviewRouter.post(routes.review.score, updateReviewScores);
reviewRouter.post(routes.review.image, MulterFileHandler.getInstance().single('file'), uploadReviewImage)


