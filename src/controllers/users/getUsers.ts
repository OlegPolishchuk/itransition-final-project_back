import {Request, Response} from "express";
import {User} from "../../models/User";

export const getUsers = async (req: Request, res: Response) => {

  try{
    const users = await User.find();

    res.status(200).json(users)
  }
  catch (e) {
    res.status(500).json({message: 'Error in getUsers Controller', e})
  }

}