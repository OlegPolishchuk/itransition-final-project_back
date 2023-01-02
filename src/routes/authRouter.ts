import {Router} from "express";
import {routes} from "../shared";
import {
  register,
  login,
  refreshToken,
  logout,
  getProfile, socialLogin, githubLogin
} from "../controllers";

import {
  authMiddleware,
  loginMiddleware,
  verifyAccessToken,
  verifyRefreshToken
} from "../middlewares";
import {findUserByToken} from "../shared";


export const authRouter = Router();

authRouter.post(
  routes.auth.register,
  [authMiddleware.checkEmail, authMiddleware.checkPassword],
  register);

authRouter.post(
  routes.auth.login,
  [loginMiddleware.checkEmail, loginMiddleware.checkPassword],
  login);

authRouter.get(routes.auth.logout, logout);
authRouter.post(routes.auth.profile, verifyAccessToken, findUserByToken(getProfile));
authRouter.get(routes.auth.refresh, verifyRefreshToken, refreshToken);

authRouter.post(routes.auth.social, socialLogin);
authRouter.post(routes.auth.github, githubLogin);