import {Request, Response} from "express";
import {User} from "../../models/User";
import {prepareUsersForClient} from "../../shared";

export const getUsers = async (req: Request, res: Response) => {

  try{
    const users = await User.find();

    const usersToClient = prepareUsersForClient(users)
    // const usersToClient = users.map(user => {
    //   const copy: Partial<User> = {...user};
    //   delete copy.password;
    //
    //   return copy;
    // })

    console.log(`usersToClient`, usersToClient)
    res.status(200).json(usersToClient)
  }
  catch (e) {
    res.status(500).json({message: 'Error in getUsers Controller', e})
  }

}