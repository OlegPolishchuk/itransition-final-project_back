import {Request, Response} from "express";
import {UserType} from "../../types";

export const getProfile = (req: Request, res: Response, user: UserType, admin:boolean = false) => {
  const body: Partial<UserType> = {...user};

  delete body.password;
  delete body.refreshToken;
  if (!admin) {
    delete body.status;
  }

  res.status(200).json({...body})
}