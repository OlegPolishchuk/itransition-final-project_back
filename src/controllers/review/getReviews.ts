import {Request, Response} from "express";
import { SortOrder } from "mongoose";
import {Reviews} from "../../models/Review";
import {defaultPaginationParams} from "../../shared";

export const getReviews = async (req: Request, res: Response) => {
  try {
    const {sortReviews, reviewId} = req.query;
    // '' : all , created: latest, score: overallScore
    const sortName: string = sortReviews as string || ''; // all reviews
    const id = reviewId as string || undefined;

    const sort = sortName ? {[sortName]: -1} : {created: -1};
    const searchId = id ? {_id: id} : {};

    const reviews = await Reviews
      .find(searchId)
      .sort(sort as { [p: string]: SortOrder })
      .limit(defaultPaginationParams.limit)

    res.status(200).json({
      totalCount: defaultPaginationParams.limit,
      reviews
    })
  }
  catch (e) {
    res.status(500).json({
      message: 'Error at getLatestReview Controller'
    })
  }
}