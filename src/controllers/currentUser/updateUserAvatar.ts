import {Request, Response} from "express";
import {format} from 'util';

import {Storage} from '@google-cloud/storage';
import {Reviews, User} from "../../models";

const storage = new Storage({keyFilename: 'google-cloud.json'});


export const updateUserAvatar = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    const bucket = storage.bucket('itransition-app')

    await storage.bucket(bucket.name).upload(file?.path as string, {
      metadata: {
        contentType: req.file?.mimetype
      }
    })

    const publicUrl = format(
      `https://storage.cloud.google.com/${bucket.name}/${file?.originalname}`
    )

    const userId = file?.originalname.split('_')[0];

    await User.updateOne({_id: userId}, {$set: {avatar: publicUrl}});
    await Reviews.updateMany({userId: userId}, {$set: {userAvatar : publicUrl}})


    res.status(201).json({
      avatar: publicUrl
    })


  }
  catch (e) {
    console.log(`ERROR`, e)
    return res.status(500).json({
      message: 'Could not upload the file'
    })
  }
}