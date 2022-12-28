import {Request, Response} from "express";
import {validationResult} from "express-validator";
import cookie from "cookie";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import {getTokens, TokenData, userStatus} from "../../shared";
import {User} from "../../models/User";
import {getProfile} from "./getProfile";
import { UserType } from "../../types";

dotenv.config();

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

    const user = await User.findOne({login: email});

    if (!user) {
      return res.status(400).json({message: 'Пользователь не найден'})
    }


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({message: 'Неверный пароль'})
    }

    if (user.status === userStatus.blocked) {
      return res.status(401).json({
        message: 'user has blocked'
      })
    }

    const {accessToken, refreshToken} = getTokens(user.id)

    try {
      const newUser: UserType | null = await User.findByIdAndUpdate(
        user._id,
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