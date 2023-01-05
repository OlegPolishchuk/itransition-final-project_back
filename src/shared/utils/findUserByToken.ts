import {Request, Response} from "express";
import {User} from "../../models/User";
import cookie from "cookie";
import {TokenData} from "../constants";
import {DecodedJWT, UserType, VerifyTokenReqType} from "../../types";

const refreshTokenAge = TokenData.refreshTokenAge;

export const findUserByToken = (cb: (req: VerifyTokenReqType, res: Response, user: UserType) => void) =>
  async (req: Request, res: Response) => {

  // const decoded = req.body.user as DecodedJWT;
  // const decoded = req.user as DecodedJWT;
  const decoded = req.user as DecodedJWT;

    try{
      const user = await User.findOne({_id: decoded.userId});

      if (!user) {
        res.status(401).json({error: 'You are not authorized'})
      }
      else {
        const refreshToken = user.refreshToken;

        res.setHeader(
          'Set-cookie',
          cookie.serialize('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: refreshTokenAge,
          })
        )

        await cb(req as VerifyTokenReqType, res, user._doc as UserType);
      }
    }
    catch (e) {
      res.status(500).json({
        error: 'Some error in findUserByToken'
      })
    }
  }