import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import dotenv from "dotenv";

dotenv.config();

const signatureRefresh = process.env.JWT_REFRESH_SECRET as string;

export const verifyRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {refreshToken} = cookie.parse(req.headers.cookie as string)

    if (!refreshToken) {
      return res.status(401);
    }

    const decoded = jwt.verify(refreshToken, signatureRefresh)

    req.tokenData = decoded;

    return next();

  } catch (e) {
    console.log('!TOKEN isnt verify')
    return res.status(401).json({message: 'expired refreshToken', e})
  }
}