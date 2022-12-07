import {Request, Response} from "express";
import {User} from "../../models/User";

export const deleteUsers = async (req: Request, res: Response) => {
  try {
    const {id} = req.query;

    if (Array.isArray(id)) {
      console.log('array!!!')
      for await (let userId of id) {
        console.log(userId)
        await User.deleteOne({_id: userId})
      }

      return res.sendStatus(204);
    }
    else {
      console.log('not array')
      const result = await User.deleteOne({_id: id});
      console.log(result)
      return res.sendStatus(204);
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Error in deleteUser Controller', e
    })
  }
}