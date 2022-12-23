import {Request, Response} from "express";
import dotenv from "dotenv";
import {Storage} from "@google-cloud/storage";
import {googleCloudBucket} from "../../shared";
import {format} from "util";

dotenv.config();

const storage = new Storage({
  credentials: JSON.parse(process.env.GOOGLE_CLOUD_KEY as string)
});


export const uploadReviewImage = async (req: Request, res: Response) => {

  try {
    const file = req.file;

    const bucket = storage.bucket(googleCloudBucket);

    await storage.bucket(bucket.name).upload(file?.path as string, {
      metadata: {
        contentType: req.file?.mimetype
      }
    })

    const publicUrl = format(
      `https://storage.cloud.google.com/${bucket.name}/${file?.originalname}`
    )


    res.status(201).json({
      imgSrc: publicUrl
    })

  }
  catch (e) {
    console.log(`ERROR`, e)
    return res.status(500).json({
      message: 'Could not upload the file - uploadReviewImage controller'
    })
  }

}