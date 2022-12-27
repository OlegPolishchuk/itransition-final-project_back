import {Response, Request} from 'express';
import {User} from "../../models/User";
import bcrypt from 'bcrypt';
import {validationResult} from "express-validator";
import {userStatus} from "../../shared";


export const register = async (req: Request, res: Response) => {

  try{
    const errors = validationResult(req);
    let role = 'user';

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

    if (email === 'admin@mail.ru' && password === 'qwerqwer') {
      role = 'admin'
    }

    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
      login: email,
      password: hashPassword,
      role,
      created: Date.now(),
      lastLogin: Date.now(),
      userName: email,
      reviewsCount: 0,
      status: userStatus.active,
      likes: 0,
    });

    await user.save();

    res.status(201).json({message: 'User created'})

  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Что-то не так в login'})
  }

}