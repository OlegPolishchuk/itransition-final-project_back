import {Request, Response} from "express";
import {getTokens, TokenData} from "../../shared";
import {User} from "../../models/User";
import cookie from "cookie";
import {DecodedJWT} from "../../types";

const accessTokenAge = TokenData.accessTokenAge;
const refreshTokenAge = TokenData.refreshTokenAge;

export const refreshToken = async (req: Request, res: Response) => {
  const decoded = req.user as DecodedJWT;

  try {
    const user = await User.findOne({_id: decoded.userId}).exec();

    if (!user) {
      console.log(`REFRESH TOKEN`, refreshToken)
      res.status(401).json({error: 'Cant find currentUser with current refresh token'})
    } else {
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

      if (newUser) {
        res.setHeader(
          'Set-cookie',
          cookie.serialize('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: refreshTokenAge,
          })
        )

        return res.status(200).json({
          token: newUser.token
        })
      }

    }
  } catch (e) {
    console.log('error !!!!!!!!!!!!!!!!!!', e)
    res.status(500).json({
      error: 'refreshToken error', e
    })
  }
}