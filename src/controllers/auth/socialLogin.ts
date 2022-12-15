import {Request, Response} from "express";
import {User} from "../../models/User";
import {getTokens, TokenData, userStatus} from "../../shared";
import cookie from "cookie";
import {getProfile} from "../../controllers";
import {UserType} from "../../types";

const refreshTokenAge = TokenData.refreshTokenAge;

export const socialLogin = async (req: Request, res: Response) => {

  const {login} = req.body;

  console.log(login)

  const user = await User.findOne({login});

  if (!user) {
    const user = new User({
      login,
      role: 'user',
      status: userStatus.active,
      created: Date.now(),
      lastLogin: Date.now(),
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