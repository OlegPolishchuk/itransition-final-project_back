import {Request, Response} from "express";
import {User} from "../../models/User";
import {userRoles} from "../../shared";

export const deleteUsers = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string | string[];

    const admin = await User.findOne({role: userRoles.admin});

    if (Array.isArray(id)) {
      let idList: string[] = [...id];

      if (admin) {
        idList = id.filter(item => {
          return item !== admin.id
        })
      }

      for await (let userId of idList) {
        await User.deleteOne({_id: userId})
      }

      return res.sendStatus(204);
    } else {
      const result = await User.deleteOne({_id: id});
      return res.sendStatus(204);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Error in deleteUser Controller'
    })
  }
}