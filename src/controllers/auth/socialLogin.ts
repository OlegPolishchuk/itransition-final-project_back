import {Request, Response} from "express";
import {User} from "../../models/User";
import {getTokens, TokenData, userStatus} from "../../shared";
import cookie from "cookie";
import {getProfile} from "../../controllers";
import {UserType} from "../../types";

const refreshTokenAge = TokenData.refreshTokenAge;

export const socialLogin = async (req: Request, res: Response) => {

  const {login, name, avatar_url, code} = req.body;

  const user = await User.findOne({login});

  if (!user) {
    const user = new User({
      login,
      userName: name || 'user name',
      avatar: avatar_url || '',
      role: 'user',
      status: userStatus.active,
      created: Date.now(),
      lastLogin: Date.now(),
      reviewsCount: 0,
      likes: 0
    })

    await user.save();

    await updateUser(user, res, req)
  }
  else {
    await updateUser(user, res, req)
  }

  async function updateUser(user: UserType, res: Response, req: Request) {
    const U = await User.findOne({login: user.login})

    if (U) {
      const {accessToken, refreshToken} = getTokens(U.id )

      const newUser: UserType | null = await User.findByIdAndUpdate(
        U.id,
        {
          token: accessToken,
          refreshToken,
          lastLogin: Date.now(),
        },
        {new: true},
      ).exec();

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: refreshTokenAge,
        })
      )

      if (newUser) {
        await getProfile(req, res, newUser._doc as UserType);
      }
    }
  }
}