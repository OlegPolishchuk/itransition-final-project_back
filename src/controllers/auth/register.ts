import {Response, Request} from 'express';
import {User} from "../../models/User";
import bcrypt from 'bcrypt';
import {validationResult} from "express-validator";


export const register = async (req: Request, res: Response) => {

  try{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при регистрации'
      })
    }

    const {email, password} = req.body;

    const candidate = await User.findOne({login: email});

    if (candidate){
      return res.status(400).json({
        message: 'Такой пользователь уже существует'
      })
    }

    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
      login: email,
      password: hashPassword,
      role: 'user',
    });

    await user.save();

    res.status(201).json({message: 'User created'})

  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Что-то не так в login'})
  }

}