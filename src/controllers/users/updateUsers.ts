import {Request, Response} from "express";
import {UpdatedUsersRequest} from "../../types/BlockedUsersRequest";
import {User} from "../../models/User";

export const updateUsers = async (req: Request, res: Response) => {

  try{
    const {users}: UpdatedUsersRequest = req.body;

    for await (let user of users) {
     await User.updateOne({_id: user.id}, {$set:{status: user.status}})
    }

    return res.sendStatus(204);
  } catch (e) {
    res
      .status(500)
      .json({message: 'Error in Update User Controller'})
  }

}