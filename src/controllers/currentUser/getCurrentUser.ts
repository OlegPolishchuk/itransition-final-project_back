import {Request, Response} from "express";
import {User} from "../../models/User";
import {getProfile} from "../auth";
import {UserType} from "../../types";

export const getCurrentUser = async (req: Request, res: Response) => {
    try{
      const {id} = req.query;

      try{
        const user = await User.findOne({_id: id});

        if (user) {
          await getProfile(req, res, user._doc as UserType, true)
        }
      }
      catch (e) {
        return res.status(400).json({
          message: 'User doesnt exist (getCurrentUser)'
        })
      }
    }
    catch (e) {
      res.status(500).json({
        message: 'Error at getCurrentUser'
      })
    }
}