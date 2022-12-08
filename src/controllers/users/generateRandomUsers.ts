import {Request, Response} from "express";
import { faker } from '@faker-js/faker';
import {User} from "../../models/User";
import {createRandomUser} from "../../shared";

export const generateRandomUsers = async (req: Request, res: Response) => {
  try {
    const {count, locale} = req.body;

    const users: Partial<User>[] = createRandomUser(count, locale);

    await User.insertMany(users);

    res.sendStatus(201);
  }
  catch (e) {
    console.log(e)
    res
      .status(500)
      .json({message: 'Error at generateRandomUser Controller'})
  }

}