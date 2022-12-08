import {Request, Response} from "express";
import {User} from "../../models/User";

export const deleteUsers = async (req: Request, res: Response) => {
  try {
    const {id} = req.query;

    if (Array.isArray(id)) {
      for await (let userId of id) {
        await User.deleteOne({_id: userId})
      }

      return res.sendStatus(204);
    }
    else {
      const result = await User.deleteOne({_id: id});
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