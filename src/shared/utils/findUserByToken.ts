import {Request, Response} from "express";
import {User} from "../../models/User";
import cookie from "cookie";
import {TokenData, userStatus} from "../constants";
import {DecodedJWT, UserType} from "../../types";

const refreshTokenAge = TokenData.refreshTokenAge;

export const findUserByToken = (cb: (req: Request, res: Response, user: UserType) => void) =>
  async (req: Request, res: Response) => {

  const decoded = req.tokenData as DecodedJWT;

    try{
      const user = await User.findOne({_id: decoded.userId});

      if (!user) {
        return res.status(401).json({error: 'You are not authorized'})
      }
      if (user.status === userStatus.blocked) {
        return res.status(401).json({error: 'User has blocked'})
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

        await cb(req, res, user._doc as UserType);
      }
    }
    catch (e) {
      res.status(500).json({
        error: 'Some error in findUserByToken'
      })
    }
  }