import {Request, Response} from "express";
import {User} from "../../models/User";
import {prepareUsersForClient} from "../../shared";

export const getUsers = async (req: Request, res: Response) => {
  let {page, limit} = req.query;

  const skipCount = Number(page) === 0 ? 0 : Number(page) * Number(limit);
  const take = Number(limit);

  try{
    const users = await User.find().skip(skipCount).limit(take);
    const count = await User.find().count();

    const usersToClient = prepareUsersForClient(users)

    res.status(200).json({users: usersToClient, count})
  }
  catch (e) {
    res.status(500).json({message: 'Error in getUsers Controller', e})
  }

}