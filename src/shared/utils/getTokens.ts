import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {TokenData} from "../../shared";

dotenv.config();


const signatureAccess = process.env.JWT_ACCESS_SECRET as string;
const signatureRefresh = process.env.JWT_REFRESH_SECRET as string;

export const getTokens = (userId: string) => ({
  accessToken: jwt.sign({userId}, signatureAccess, {
    expiresIn: `${TokenData.accessTokenAge}s`,
  }),
  refreshToken: jwt.sign({userId}, signatureRefresh, {
    expiresIn: `${TokenData.refreshTokenAge}s`
  })
})