import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const signatureAccess = process.env.JWT_ACCESS_SECRET as string;

export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : '';

    if (!token) {
      return res.status(401);
    }

    try {
      jwt.verify(token, signatureAccess, (err) => {
        if (err) {
          console.log(`verify Access Token Error`, err)
        }
      })
    } catch (e) {
      return res.status(401).json({message: 'expired access token'})
    }

  next();
}