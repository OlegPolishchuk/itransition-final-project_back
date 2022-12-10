import {Request, Response} from "express";
import {User} from "../../models/User";

export const updateUser = async (req: Request, res: Response) => {

  try{
    const {user} = req.body;

    await User.updateOne({_id: user._id}, {$set:{...user}})

    res.sendStatus(201);
  }
  catch (e) {
    res.status(500).json({
      message: 'Error at updateUser Controller'
    })
  }

}