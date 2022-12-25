import {Request, Response} from "express";
import {User} from "../../models/User";
import {defaultUsersQueryParams, prepareUsersForClient} from "../../shared";

export const getUsers = async (req: Request, res: Response) => {
  let {page, limit} = req.query;

  let pageNumber = Number(page);
  let limitNumber = Number(limit);

  if (isNaN(pageNumber)) {
    pageNumber = defaultUsersQueryParams.page
  }

  if (isNaN(limitNumber)) {
    limitNumber = defaultUsersQueryParams.limit
  }

  const skipCount = pageNumber === 0 ? 0 : pageNumber * limitNumber;
  const take = limitNumber !== 0 ? limitNumber : defaultUsersQueryParams.limit;



  try{
    const users = await User.find().skip(skipCount).limit(take);
    const count = await User.find().count();

    const usersToClient = await prepareUsersForClient(users)

    res.status(200).json({users: usersToClient, count})
  }
  catch (e) {
    res.status(500).json({message: 'Error in getUsers Controller', e})
  }

}