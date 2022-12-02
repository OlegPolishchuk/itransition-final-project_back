import {Response, Request} from 'express';
import LocaleStrategy from 'passport';


export const authController = (req: Request, res: Response) => {
  res.status(200).json({message: 'ok'})


}