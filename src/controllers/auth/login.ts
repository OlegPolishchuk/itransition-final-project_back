import {Request, Response} from "express";
import {validationResult} from "express-validator";
import cookie from "cookie";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import {getTokens, TokenData} from "../../shared";
import {User} from "../../models/User";
import {getProfile} from "./getProfile";

dotenv.config();

const accessTokenAge = TokenData.accessTokenAge;
const refreshTokenAge = TokenData.refreshTokenAge;

export const login =  async (req: Request, res: Response) => {
  try{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при входе'
      })
    }

    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
      return res.status(400).json({message: 'Пользователь не найден'})
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({message: 'Неверный пароль'})
    }

    const {accessToken, refreshToken} = getTokens(user.id)

    try {
      const newUser: User | null = await User.findByIdAndUpdate(
        user._id,
        {
          token: accessToken,
          refreshToken,
          tokenExpire: accessTokenAge,
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
    catch (e) {
      res.status(500).json({
        error: 'some error with update token in DB(login controller)',
      })
    }

  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Что-то не так в login'})
  }

}