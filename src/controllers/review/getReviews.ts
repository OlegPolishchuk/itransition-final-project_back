import {Request, Response} from "express";
import { SortOrder } from "mongoose";
import {Reviews} from "../../models/Review";
import {defaultPaginationParams} from "../../shared";


export const getReviews = async (req: Request, res: Response) => {
  try {
    const {reviewsSortParams, reviewId, page, limit, search, tags} = req.query;

    const sortName: string = reviewsSortParams as string || '';
    const id = reviewId as string || undefined;
    const tagsParams = tags ? tags as string[] : [];

    const pageNumber = page ? Number(page) : 0;
    const limitNumber = limit ? Number(limit) : defaultPaginationParams.limit;

    const skipCount = pageNumber === 0 ? 0 : pageNumber * limitNumber;

    const sort: { [p: string]: SortOrder } = sortName ? {[sortName]: -1} : {created: -1};
    const searchId = id ? {_id: id} : {};


    let reviews = [];

    if (search) {
      reviews = await Reviews
        .find({$text: {$search: `"${search}"`}}, {score: {$meta: "textScore"}})
        .sort({score:{$meta:"textScore"}})
    }
    else if (tagsParams.length > 0) {
      console.log(tagsParams.join(' '))
      reviews = await Reviews
        .find({tags: tagsParams})
        .sort(sort)

      if (reviews.length === 0) {
        for await (let tag of tagsParams) {
          const searchReviews = await Reviews.find({tags: tag})
          reviews = [...reviews, ...searchReviews];
        }
      }

    }
    else {
      reviews = await Reviews
        .find(searchId)
        .sort(sort)
    }

    const resultReviews = reviews.slice(skipCount, limitNumber + skipCount);
    const totalCount = reviews.length;

    res.status(200).json({
      totalCount,
      reviews: resultReviews,
    })
  }
  catch (e) {
    res.status(500).json({
      message: 'Error at getReviews Controller', e
    })
  }
}