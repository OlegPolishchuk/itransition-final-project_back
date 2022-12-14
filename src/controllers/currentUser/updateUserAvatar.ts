import {Request, Response} from "express";
import {format} from 'util';
import {Storage} from '@google-cloud/storage';
import {Reviews, User} from "../../models";
import dotenv from "dotenv";
import {googleCloudBucket} from "../../shared";

dotenv.config();

const storage = new Storage({
 credentials: JSON.parse(process.env.GOOGLE_CLOUD_KEY as string)
});


export const updateUserAvatar = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    const bucket = storage.bucket(googleCloudBucket)

    await storage.bucket(bucket.name).upload(file?.path as string, {
      metadata: {
        contentType: req.file?.mimetype
      }
    })

    const publicUrl = format(
      `https://storage.cloud.google.com/${bucket.name}/${file?.originalname}`
    )

    console.log(`publicUrl`, publicUrl)
    console.log(`file =>`, file)
    const userId = file?.originalname.split('_')[0];

    const user = await User.findOne({_id: userId});

    if (user) {

      try {
        const prevAvatarName = user.avatar.split('/').reverse()[0];
        await storage.bucket(bucket.name).file(prevAvatarName).delete();
      }
      catch (e) {
        console.log(`Could not delete prev avatar `)
      }
    }

    await User.updateOne({_id: userId}, {avatar: publicUrl});
    await Reviews.updateMany({userId: userId}, {$set: {userAvatar: publicUrl}})


    res.status(201).json({
      avatar: publicUrl
    })


  } catch (e) {
    console.log(`ERROR`, e)
    return res.status(500).json({
      message: 'Could not upload the file'
    })
  }
}