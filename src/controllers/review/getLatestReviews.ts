import {Request, Response} from "express";
import {Reviews} from "../../models/Review";
import {defaultPaginationParams} from "../../shared";

export const getLatestReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Reviews.aggregate()
      .sort({created: 1})
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