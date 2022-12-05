import {Request, Response} from "express";
import {User} from "../../models/User";
import cookie from "cookie";
import {TokenData} from "../constants";

const refreshTokenAge = TokenData.refreshTokenAge;

export const findUserByToken = (cb: (req: Request, res: Response, user: User) => void) =>
  async (req: Request, res: Response) => {

  const token = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : '';

    try{
      const user = await User.findOne({token}).exec();

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

        await cb(req, res, user._doc as User);
      }
    }
    catch (e) {
      res.status(500).json({
        error: 'Some error in findUserByToken'
      })
    }
  }