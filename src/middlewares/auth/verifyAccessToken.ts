import {NextFunction, Response} from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {DecodedJWT, VerifyTokenReqType} from "../../types";

dotenv.config();



const signatureAccess = process.env.JWT_ACCESS_SECRET as string;

export const verifyAccessToken = async (req: VerifyTokenReqType, res: Response, next: NextFunction) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : '';

  if (!token) {
    return res.status(401);
  }

  try {

    const decoded = jwt.verify(token, signatureAccess);

    req.user = decoded as DecodedJWT;

    return next();

  } catch (e) {
    console.log(e)
    return res.status(401).json({message: 'expired access token', e})
  }
}