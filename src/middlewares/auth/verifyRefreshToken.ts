import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import dotenv from "dotenv";

dotenv.config();

const signatureRefresh = process.env.JWT_REFRESH_SECRET as string;

export const verifyRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  const {refreshToken} = cookie.parse(req.headers.cookie as string)

  const stringRefreshToken = refreshToken.toString();
  if (!refreshToken) {
    return res.status(401);
  }
  console.log(stringRefreshToken);
  try {
    const decoded = jwt.verify(stringRefreshToken, signatureRefresh)

    req.user = decoded;

    return next();

  } catch (e) {
    console.log('!TOKEN isnt verify')
    return res.status(401).json({message: 'expired refreshToken', e})
  }
}