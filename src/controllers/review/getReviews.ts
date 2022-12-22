import {Request, Response} from "express";
import { SortOrder } from "mongoose";
import {Reviews} from "../../models/Review";
import {defaultPaginationParams} from "../../shared";

export const getReviews = async (req: Request, res: Response) => {
  try {
    const {sortReviews, reviewId, page, limit} = req.query;

    const sortName: string = sortReviews as string || '';
    const id = reviewId as string || undefined;

    const pageNumber = page ? Number(page) : 0;
    const limitNumber = limit ? Number(limit) : defaultPaginationParams.limit;

    const skipCount = pageNumber === 0 ? 0 : pageNumber * limitNumber;

    const sort = sortName ? {[sortName]: -1} : {created: -1};
    const searchId = id ? {_id: id} : {};

    const reviews = await Reviews
      .find(searchId)
      .sort(sort as { [p: string]: SortOrder })

    const resultReviews = reviews.slice(skipCount, limitNumber + skipCount);

    const totalCount = await Reviews.find().count();

    res.status(200).json({
      totalCount,
      reviews: resultReviews,
    })
  }
  catch (e) {
    res.status(500).json({
      message: 'Error at getLatestReview Controller'
    })
  }
}