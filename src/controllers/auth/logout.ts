import {Request, Response} from "express";
import cookie from "cookie";

export const logout = (req: Request, res: Response) => {
  res.setHeader(
    'Set-cookie',
    cookie.serialize('refreshToken', '', {
      httpOnly: true,
      maxAge: 0,
    })
  )

  res.sendStatus(200);
}