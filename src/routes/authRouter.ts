import {Router} from "express";
import {sessionController} from "../controllers/sessionController";
import {authController} from "../controllers/authController";
import {registerController} from "../controllers/auth/registerController";
import {check, validationResult} from 'express-validator';
import {loginController} from "../controllers/auth/loginController";
import {authMiddleware} from "../middlewares/auth/register";
import {loginMiddleware} from "../middlewares/auth/login";

export const authRouter = Router();

// authRouter.get('/oauth/google', sessionController);

//localhost:3000/api/auth/
authRouter.post('', authController);

//localhost:3000/api/auth/register
authRouter.post(
  '/register',
  [authMiddleware.checkEmail, authMiddleware.checkPassword],
  registerController);

//localhost:3000/api/auth/login
authRouter.post(
  '/login',
  [loginMiddleware.checkEmail, loginMiddleware.checkPassword],
  loginController);