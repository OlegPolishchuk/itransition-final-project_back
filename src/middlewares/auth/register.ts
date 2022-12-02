import {check} from "express-validator";

export const authMiddleware = {
  checkEmail: check('email', 'Некорректный email').isEmail(),
  checkPassword: check('password', 'Min length is 6 char').isLength({min: 6})
}