import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const signatureRefresh = process.env.JWT_REFRESH_SECRET as string;

export const verifyRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  const {refreshToken} = cookie.parse(req.headers.cookie as string)

  if (!refreshToken) {
    return res.status(401);
  }

  try {
    jwt.verify(refreshToken, signatureRefresh)
  } catch (e) {
    return res.status(401).json({message: 'expired refreshToken'})
  }

  next();
}