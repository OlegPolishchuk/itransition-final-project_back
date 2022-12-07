import {Request, Response} from "express";
import {User} from "../../models/User";

export const getProfile = (req: Request, res: Response, user: User) => {
  const body: Partial<User> = {...user};

  delete body.password;
  delete body.refreshToken;
  delete body.status;

  res.status(200).json({...body})
}