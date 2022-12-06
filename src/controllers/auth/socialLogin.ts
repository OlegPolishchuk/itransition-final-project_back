import {Request, Response} from "express";
import {User} from "../../models/User";
import {getTokens, TokenData} from "../../shared";
import cookie from "cookie";
import {getProfile} from "../../controllers/auth/getProfile";

const refreshTokenAge = TokenData.refreshTokenAge;

export const socialLogin = async (req: Request, res: Response) => {

  const {login} = req.body;

  const user = await User.findOne({login});

  if (!user) {

    const user = new User({
      login,
      role: 'user',
    })

    await user.save();

    await updateUser(user, res, req)
  }
  if (user) {
    await updateUser(user, res, req)
  }

  async function updateUser(user: User, res: Response, req: Request) {
    const U = await User.findOne({login: user.login})

    if (U) {
      const {accessToken, refreshToken} = getTokens(U.id )

      const newUser: User | null = await User.findByIdAndUpdate(
        U.id,
        {
          token: accessToken,
          refreshToken,
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
        await getProfile(req, res, newUser._doc as User);
      }
    }
  }
}