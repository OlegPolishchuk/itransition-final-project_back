import {Request, Response} from "express";
import { SortOrder } from "mongoose";
import {Reviews} from "../../models/Review";
import {defaultPaginationParams} from "../../shared";

export const getReviews = async (req: Request, res: Response) => {
  try {
    const {sortReviews, reviewId, page, limit} = req.query;
    // '' : all , created: latest, score: overallScore
    const sortName: string = sortReviews as string || ''; // all reviews
    const id = reviewId as string || undefined;

    const pageNumber = page ? Number(page) : 0;
    const limitNumber = limit ? Number(limit) : defaultPaginationParams.limit;

    const skipCount = pageNumber === 0 ? 0 : pageNumber * limitNumber;

    const sort = sortName ? {[sortName]: -1} : {created: -1};
    const searchId = id ? {_id: id} : {};

    // const reviews = await Reviews
    //   .find(searchId)
    //   .sort(sort as { [p: string]: SortOrder })
    //   .skip(skipCount)
    //   .limit(limitNumber);

    const reviews = await Reviews
      .find(searchId)
      .sort(sort as { [p: string]: SortOrder })

    const resultReviews = reviews.slice(skipCount, limitNumber + skipCount);

    // const reviews = await Reviews
    //   .find(searchId)
    //   .sort({overallScore: -1})
    //   .skip(0)
    //   .limit(10);


    const totalCount = await Reviews.find().count();

    res.status(200).json({
      totalCount,
      reviews: resultReviews,
      skip: skipCount,
      limit: limitNumber,
      sorted: await Reviews.find(searchId).sort(sort as {[p: string]: SortOrder })
    })
  }
  catch (e) {
    res.status(500).json({
      message: 'Error at getLatestReview Controller'
    })
  }
}