import {check} from "express-validator";

export const loginMiddleware = {
  checkEmail: check('email', 'Некорректный email').normalizeEmail().isEmail(),
  checkPassword: check('password', 'Введите пароль').exists(),
}