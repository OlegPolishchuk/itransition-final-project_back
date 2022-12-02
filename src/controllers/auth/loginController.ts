import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {User} from "../../models/User";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwt_secret = process.env.JWT_SECRET as string;

export const loginController =  async (req: Request, res: Response) => {

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

    // пользователь найден, + пароль совпадает с тем, что в базе
    const token = jwt.sign(
      {userId: user.id},
      jwt_secret,
      {expiresIn: '1h'}
    )

    res.status(200).json({token, user})

  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Что-то не так в loginController'})
  }

}