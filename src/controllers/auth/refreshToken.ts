import {Request, Response} from "express";
import {getTokens, TokenData} from "../../shared";
import {User} from "../../models/User";
import cookie from "cookie";

const accessTokenAge = TokenData.accessTokenAge;
const refreshTokenAge = TokenData.refreshTokenAge;

export const refreshToken = async (req: Request, res: Response) => {
  const {refreshToken} = cookie.parse(req.headers.cookie as string)

  try {
    const user = await User.findOne({refreshToken}).exec();

    if (!user) {
      res.status(401).json({error: 'Cant find user with current refresh token'})
    }
    else {
      const {accessToken, refreshToken} = getTokens(user.id);

      const newUser = await User.findByIdAndUpdate(
        user._id,
        {
          refreshToken,
          token: accessToken,
          tokenExpire: accessTokenAge,
        },
        {new: true},
      ).exec();

      res.setHeader(
        'Set-cookie',
        cookie.serialize('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: refreshTokenAge,
        })
      )
      res.status(200).json({
        token: newUser?.token
      })

    }
  }
  catch (e) {
    res.status(500).json({
      error: 'refreshToken error'})
  }
}