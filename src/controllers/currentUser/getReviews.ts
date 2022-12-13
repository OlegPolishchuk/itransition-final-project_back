import {Request, Response} from "express";
import {Reviews} from "../../models/Review";
import {defaultPaginationParams} from "../../shared";

export const getReviews = async (req: Request, res: Response) => {
  try{
    const {id, page, limit} = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skipCount = pageNumber === 0 ? 0 : pageNumber * limitNumber;
    const take = limitNumber !== 0 ? limitNumber : defaultPaginationParams.limit;

    const reviews = await Reviews.find({userId: id}).skip(skipCount).limit(take);
    const totalCount = await Reviews.find({userId: id}).count();

    res.status(200).json({reviews, totalCount})
  }
  catch (e) {
    res.status(500).json({
      message: 'Error at getReview Controller'
    })
  }
}